const FALLBACK_COURSES = [
    { title: 'Python Basics', slug: 'python-basics', short_description: 'Start here! Learn variables, loops, and functions.', difficulty: 'beginner', module_count: 4, lesson_count: 12 },
    { title: 'Data Structures', slug: 'data-structures', short_description: 'Lists, dictionaries, sets, and tuples.', difficulty: 'beginner', module_count: 3, lesson_count: 10 },
    { title: 'Web Scraping', slug: 'web-scraping', short_description: 'Extract data from websites with Python.', difficulty: 'intermediate', module_count: 3, lesson_count: 9 },
    { title: 'APIs & Automation', slug: 'apis-automation', short_description: 'Build APIs and automate workflows.', difficulty: 'intermediate', module_count: 4, lesson_count: 14 },
];

const Pages = {
    async dashboard() {
        const app = document.getElementById('app');
        app.innerHTML = '';

        app.appendChild(Components.pageHeader('LearnApp', 'Learn Python interactively'));

        // Show small closable guest notification instead of big banner
        if (Auth.isGuest()) {
            app.appendChild(Components.guestNotification());
        }

        if (Auth.user && Auth.isGuest()) {
            const profile = Auth.loadGuestProfile();
            if (profile.name) {
                app.appendChild(Components.statCards([
                    { value: '0 XP', label: 'XP' },
                    { value: 'Level 1', label: 'Level' },
                    { value: '0', label: 'Day Streak' },
                ]));
            }
        } else if (Auth.user) {
            app.appendChild(Components.statCards([
                { value: Auth.user.xp, label: 'XP' },
                { value: Auth.user.level, label: 'Level' },
                { value: Auth.user.streak_count || 0, label: 'Day Streak' },
            ]));
        }

        const quickActions = document.createElement('div');
        quickActions.style.cssText = 'padding: 8px 16px; display: flex; gap: 8px; flex-wrap: wrap;';
        quickActions.innerHTML = `
            <button class="btn btn-sm btn-secondary" onclick="App.navigate('leaderboard')" style="flex:1;min-width:100px;">🏆 Leaderboard</button>
            <button class="btn btn-sm btn-secondary" onclick="App.navigate('profile')" style="flex:1;min-width:100px;">👤 Profile</button>
            <button class="btn btn-sm btn-secondary" onclick="App.navigate('projects')" style="flex:1;min-width:100px;">📁 Projects</button>
        `;
        app.appendChild(quickActions);

        const sectionTitle = document.createElement('div');
        sectionTitle.style.cssText = 'padding:16px 16px 4px;font-size:14px;font-weight:600;color:var(--text-secondary);';
        sectionTitle.textContent = '📚 Courses';
        app.appendChild(sectionTitle);

        const container = document.createElement('div');
        container.className = 'course-list';
        container.appendChild(Components.spinner());
        app.appendChild(container);

        const { ok, data } = await API.get('/courses/', !Auth.isGuest());
        container.innerHTML = '';
        if (ok && data.results && data.results.length > 0) {
            data.results.forEach(c => container.appendChild(Components.courseCard(c)));
        } else {
            // Show placeholder courses when API fails or returns empty
            FALLBACK_COURSES.forEach(c => container.appendChild(Components.courseCard(c)));
        }

        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'dashboard'));
    },

    async courseDetail(slug) {
        const app = document.getElementById('app');
        app.innerHTML = '';
        const { ok, data } = await API.get(`/courses/${slug}/`);
        if (!ok) { app.innerHTML = '<p>Course not found</p>'; return; }
        app.appendChild(Components.backButton());
        const header = document.createElement('div');
        header.className = 'page-header';
        header.innerHTML = `<h1>${data.title}</h1><p style="color:var(--text-secondary);font-size:13px;">${data.description}</p>`;
        app.appendChild(header);
        let progressData = { completed_items: 0, total_items: 0, progress_pct: 0 };
        if (API.isAuthenticated()) {
            const pRes = await API.get(`/courses/progress/${slug}/`);
            if (pRes.ok) progressData = pRes.data;
        }
        app.appendChild(Components.statCards([
            { value: `${progressData.progress_pct}%`, label: 'Complete' },
            { value: progressData.completed_items, label: 'Done' },
            { value: progressData.total_items, label: 'Total' },
        ]));
        const completedSet = new Set();
        if (API.isAuthenticated()) {
            const pAll = await API.get('/courses/progress/');
            if (pAll.ok && pAll.data) {
                pAll.data.completed_lessons?.forEach(id => completedSet.add(`lesson-${id}`));
                pAll.data.completed_challenges?.forEach(id => completedSet.add(`challenge-${id}`));
                pAll.data.completed_quizzes?.forEach(id => completedSet.add(`quiz-${id}`));
            }
        }
        (data.modules || []).forEach(mod => {
            const section = document.createElement('div');
            section.className = 'module-section';
            section.innerHTML = `
                <div class="module-header">
                    <h3>${mod.title}</h3>
                    <span class="arrow">▼</span>
                </div>
                <div class="module-content" style="display:none;">
                    ${mod.description ? `<p style="color:var(--text-secondary);font-size:12px;margin-bottom:8px;">${mod.description}</p>` : ''}
                    <div class="lesson-list"></div>
                </div>
            `;
            const header_el = section.querySelector('.module-header');
            const content = section.querySelector('.module-content');
            header_el.onclick = () => {
                const open = content.style.display !== 'none';
                content.style.display = open ? 'none' : 'block';
                header_el.querySelector('.arrow').classList.toggle('open', !open);
            };
            if (mod === data.modules[0]) {
                content.style.display = 'block';
                header_el.querySelector('.arrow').classList.add('open');
            }
            const list = section.querySelector('.lesson-list');
            if (mod.lessons) mod.lessons.forEach(l => {
                list.appendChild(Components.lessonItem(l, completedSet.has(`lesson-${l.id}`)));
            });
            if (mod.challenges) mod.challenges.forEach(c => {
                list.appendChild(Components.lessonItem({
                    id: c.id,
                    title: c.title,
                    lesson_type: 'code',
                    xp_reward: c.xp_reward,
                }, completedSet.has(`challenge-${c.id}`)));
            });
            if (mod.quizzes) mod.quizzes.forEach(q => {
                list.appendChild(Components.lessonItem({
                    id: q.id,
                    title: q.title,
                    lesson_type: 'quiz',
                    xp_reward: q.xp_reward,
                }, completedSet.has(`quiz-${q.id}`)));
            });
            app.appendChild(section);
        });
        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'dashboard'));
        app.appendChild(Components.chatToggle());
    },

    async lessonDetail(lessonId) {
        const app = document.getElementById('app');
        app.innerHTML = '';
        app.appendChild(Components.spinner());
        const coursesRes = await API.get('/courses/');
        let lesson = null;
        let courseSlug = '';
        if (coursesRes.ok) {
            for (const c of (coursesRes.data.results || [])) {
                const modRes = await API.get(`/courses/${c.slug}/`);
                if (modRes.ok && modRes.data.modules) {
                    for (const mod of modRes.data.modules) {
                        for (const l of (mod.lessons || [])) {
                            if (l.id == lessonId) { lesson = l; courseSlug = c.slug; break; }
                        }
                        if (lesson) break;
                    }
                }
                if (lesson) break;
            }
        }
        app.innerHTML = '';
        if (!lesson) { app.innerHTML = '<p style="padding:20px;">Lesson not found</p>'; return; }
        app.appendChild(Components.backButton());
        const header = Components.pageHeader(lesson.title, `+${lesson.xp_reward} XP`);
        app.appendChild(header);
        const content = document.createElement('div');
        content.className = 'content-page';
        content.innerHTML = lesson.content;
        app.appendChild(content);

        const btnGrp = document.createElement('div');
        btnGrp.className = 'btn-group';
        btnGrp.innerHTML = '<button class="btn btn-primary" id="complete-lesson">Mark Complete</button>';
        app.appendChild(btnGrp);

        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'dashboard'));

        document.getElementById('complete-lesson').onclick = async () => {
            const { ok, data } = await API.post(`/courses/${courseSlug}/lessons/${lesson.slug}/complete/`);
            if (ok) {
                const overlay = Components.resultOverlay(data, '');
                document.body.appendChild(overlay);
            }
        };
    },

    async challengeDetail(challengeId) {
        const app = document.getElementById('app');
        app.innerHTML = '';
        const coursesRes = await API.get('/courses/');
        let challenge = null;
        let courseSlug = '';
        if (coursesRes.ok) {
            for (const c of (coursesRes.data.results || [])) {
                const chRes = await API.get(`/courses/${c.slug}/challenges/`);
                if (chRes.ok) {
                    for (const ch of (chRes.data || [])) {
                        if (ch.id == challengeId) { challenge = ch; courseSlug = c.slug; break; }
                    }
                }
                if (challenge) break;
            }
        }
        app.innerHTML = '';
        if (!challenge) { app.innerHTML = '<p style="padding:20px;">Challenge not found</p>'; return; }
        app.appendChild(Components.backButton());
        app.appendChild(Components.pageHeader(challenge.title, `+${challenge.xp_reward} XP`));
        const instr = document.createElement('div');
        instr.className = 'content-page';
        instr.innerHTML = challenge.instruction;
        app.appendChild(instr);
        const editor = Components.codeEditor(challenge.starter_code || '');
        app.appendChild(editor);
        const btnGrp = document.createElement('div');
        btnGrp.className = 'btn-group';
        btnGrp.innerHTML = '<button class="btn btn-primary" id="submit-challenge">Submit Solution</button>';
        app.appendChild(btnGrp);
        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'dashboard'));

        const editorId = editor.dataset.editorId;

        document.getElementById(`run-btn-${editorId}`).onclick = async () => {
            const code = window.getEditorCode(editorId);
            const output = document.getElementById(`output-${editorId}`);
            output.textContent = 'Running...';
            output.className = 'output-box';
            const { ok, data } = await API.post('/sandbox/execute/', { code });
            output.textContent = data.output || data.error || 'No output';
            output.className = `output-box ${ok ? 'success' : 'error'}`;
        };

        document.getElementById(`review-btn-${editorId}`).onclick = async () => {
            const code = window.getEditorCode(editorId);
            const output = document.getElementById(`output-${editorId}`);
            output.textContent = 'Reviewing...';
            output.className = 'output-box';
            const { ok, data } = await API.post('/sandbox/review/', { code });
            output.textContent = data.analysis || data.error || 'No feedback';
            output.className = `output-box ${ok ? 'success' : 'error'}`;
        };

        document.getElementById('submit-challenge').onclick = async () => {
            const code = window.getEditorCode(editorId);
            const { ok, data } = await API.post(`/courses/${courseSlug}/challenges/${challenge.slug}/submit/`, { code });
            if (ok) {
                const overlay = Components.resultOverlay(data, '');
                document.body.appendChild(overlay);
            } else {
                alert('Error submitting solution');
            }
        };
    },

    async quizDetail(quizId) {
        const app = document.getElementById('app');
        app.innerHTML = '';
        const coursesRes = await API.get('/courses/');
        let quiz = null;
        let courseSlug = '';
        if (coursesRes.ok) {
            for (const c of (coursesRes.data.results || [])) {
                const qRes = await API.get(`/courses/${c.slug}/quizzes/`);
                if (qRes.ok) {
                    for (const q of (qRes.data || [])) {
                        if (q.id == quizId) { quiz = q; courseSlug = c.slug; break; }
                    }
                }
                if (quiz) break;
            }
        }
        app.innerHTML = '';
        if (!quiz) { app.innerHTML = '<p style="padding:20px;">Quiz not found</p>'; return; }
        app.appendChild(Components.backButton());
        app.appendChild(Components.pageHeader(quiz.title, `+${quiz.xp_reward} XP`));
        const answers = {};
        const form = document.createElement('div');
        form.className = 'content-page';
        const qs = quiz.questions || [];
        qs.forEach((q, qi) => {
            const div = document.createElement('div');
            div.className = 'quiz-question';
            div.innerHTML = `<div class="q-text">${qi + 1}. ${q.question_text}</div>`;
            q.answers.forEach(a => {
                const opt = document.createElement('div');
                opt.className = 'quiz-option';
                opt.dataset.qid = q.id;
                opt.dataset.aid = a.id;
                opt.innerHTML = `<div class="radio"></div><span>${a.answer_text}</span>`;
                opt.onclick = () => {
                    const siblings = div.querySelectorAll(`.quiz-option[data-qid="${q.id}"]`);
                    siblings.forEach(s => s.classList.remove('selected'));
                    opt.classList.add('selected');
                    answers[q.id] = a.id;
                };
                div.appendChild(opt);
            });
            form.appendChild(div);
        });
        app.appendChild(form);
        const btnGrp = document.createElement('div');
        btnGrp.className = 'btn-group';
        btnGrp.innerHTML = '<button class="btn btn-primary" id="submit-quiz">Submit Quiz</button>';
        app.appendChild(btnGrp);
        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'quiz'));
        document.getElementById('submit-quiz').onclick = async () => {
            const ansList = Object.entries(answers).map(([qid, aid]) => ({
                question_id: parseInt(qid),
                answer_id: parseInt(aid),
            }));
            if (ansList.length < qs.length) {
                alert('Please answer all questions');
                return;
            }
            const { ok, data } = await API.post(`/courses/${courseSlug}/quizzes/${quiz.slug}/submit/`, { answers: ansList });
            if (ok) {
                qs.forEach(q => {
                    const correctId = q.answers.find(a => a.is_correct)?.id;
                    const options = document.querySelectorAll(`.quiz-option[data-qid="${q.id}"]`);
                    options.forEach(o => {
                        if (parseInt(o.dataset.aid) === correctId) o.classList.add('correct');
                        else if (o.classList.contains('selected') && parseInt(o.dataset.aid) !== correctId) o.classList.add('wrong');
                    });
                });
                setTimeout(() => {
                    const overlay = Components.resultOverlay(data, '');
                    document.body.appendChild(overlay);
                }, 1000);
            }
        };
    },

    async projects() {
        const app = document.getElementById('app');
        app.innerHTML = '';
        app.appendChild(Components.pageHeader('My Projects', 'Your saved projects'));
        const actions = document.createElement('div');
        actions.style.cssText = 'padding: 0 16px 12px;';
        actions.innerHTML = '<button class="btn btn-primary" onclick="App.navigate(\'projects/new\')">+ New Project</button>';
        app.appendChild(actions);
        app.appendChild(Components.spinner());
        const { ok, data } = await API.get('/courses/projects/');
        app.innerHTML = '';
        app.appendChild(Components.pageHeader('My Projects', 'Your saved projects'));
        app.appendChild(actions);
        const list = document.createElement('div');
        list.className = 'course-list';
        if (ok && data.results && data.results.length) {
            data.results.forEach(p => list.appendChild(Components.projectCard(p)));
        } else {
            list.innerHTML = '<p style="padding:20px;text-align:center;color:var(--text-muted);">No projects yet. Create your first one!</p>';
        }
        app.appendChild(list);
        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'dashboard'));
    },

    async projectDetail(projectId) {
        const app = document.getElementById('app');
        app.innerHTML = '';
        app.appendChild(Components.spinner());
        const { ok, data } = await API.get(`/courses/projects/${projectId}/`);
        app.innerHTML = '';
        if (!ok) { app.innerHTML = '<p style="padding:20px;">Project not found</p>'; return; }
        app.appendChild(Components.backButton());
        app.appendChild(Components.pageHeader(data.title, data.language));
        if (data.description) {
            const desc = document.createElement('div');
            desc.style.cssText = 'padding: 0 16px 12px; font-size:14px; color:var(--text-secondary);';
            desc.textContent = data.description;
            app.appendChild(desc);
        }
        const editor = Components.codeEditor(data.code);
        app.appendChild(editor);
        const btnGrp = document.createElement('div');
        btnGrp.className = 'btn-group';
        btnGrp.style.cssText = 'padding: 16px; display: flex; flex-direction: column; gap: 8px;';
        btnGrp.innerHTML = `
            <button class="btn btn-primary" id="save-project">💾 Save</button>
            <button class="btn btn-secondary" id="run-project-btn">▶ Run</button>
            <div style="display:flex;gap:8px;">
                <button class="btn btn-sm btn-secondary" id="delete-project" style="color:var(--error);">Delete</button>
                <label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-secondary);cursor:pointer;">
                    <input type="checkbox" id="public-toggle" ${data.is_public ? 'checked' : ''}> Public
                </label>
            </div>
        `;
        app.appendChild(btnGrp);
        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'dashboard'));

        const editorId = editor.dataset.editorId;

        document.getElementById(`run-btn-${editorId}`).onclick = async () => {
            const code = window.getEditorCode(editorId);
            const output = document.getElementById(`output-${editorId}`);
            output.textContent = 'Running...';
            output.className = 'output-box';
            const res = await API.post('/sandbox/execute/', { code });
            output.textContent = res.data.output || res.data.error || 'No output';
            output.className = `output-box ${res.ok ? 'success' : 'error'}`;
        };

        document.getElementById(`review-btn-${editorId}`).onclick = async () => {
            const code = window.getEditorCode(editorId);
            const output = document.getElementById(`output-${editorId}`);
            output.textContent = 'Reviewing...';
            output.className = 'output-box';
            const res = await API.post('/sandbox/review/', { code });
            output.textContent = res.data.analysis || res.data.error || 'No feedback';
            output.className = `output-box ${res.ok ? 'success' : 'error'}`;
        };

        document.getElementById('save-project').onclick = async () => {
            const code = window.getEditorCode(editorId);
            const isPublic = document.getElementById('public-toggle').checked;
            const res = await API.put(`/courses/projects/${projectId}/`, {
                title: data.title,
                description: data.description,
                code: code,
                language: data.language,
                is_public: isPublic,
            });
            if (res.ok) {
                alert('Project saved!');
            } else {
                alert('Error saving project');
            }
        };

        document.getElementById('run-project-btn').onclick = () => {
            document.getElementById(`run-btn-${editorId}`).click();
        };

        document.getElementById('delete-project').onclick = async () => {
            if (!confirm('Delete this project?')) return;
            const res = await API.del(`/courses/projects/${projectId}/`);
            if (res.ok) App.navigate('projects');
        };
    },

    async projectNew() {
        const app = document.getElementById('app');
        app.innerHTML = '';
        app.appendChild(Components.backButton());
        app.appendChild(Components.pageHeader('New Project', 'Create a new coding project'));

        const form = document.createElement('div');
        form.style.cssText = 'padding: 16px;';
        form.innerHTML = `
            <div class="form-group">
                <label>Project Title</label>
                <input class="form-input" id="proj-title" placeholder="My Awesome Project">
            </div>
            <div class="form-group">
                <label>Description (optional)</label>
                <input class="form-input" id="proj-desc" placeholder="What does this project do?">
            </div>
            <div class="form-group">
                <label>Language</label>
                <select class="form-input" id="proj-lang">
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="html">HTML</option>
                    <option value="sql">SQL</option>
                </select>
            </div>
        `;
        app.appendChild(form);

        const editor = Components.codeEditor('# Write your code here\n');
        app.appendChild(editor);

        const btnGrp = document.createElement('div');
        btnGrp.className = 'btn-group';
        btnGrp.innerHTML = '<button class="btn btn-primary" id="create-project">Create Project</button>';
        app.appendChild(btnGrp);

        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'dashboard'));

        const editorId = editor.dataset.editorId;

        document.getElementById(`run-btn-${editorId}`).onclick = async () => {
            const code = window.getEditorCode(editorId);
            const output = document.getElementById(`output-${editorId}`);
            output.textContent = 'Running...';
            output.className = 'output-box';
            const res = await API.post('/sandbox/execute/', { code });
            output.textContent = res.data.output || res.data.error || 'No output';
            output.className = `output-box ${res.ok ? 'success' : 'error'}`;
        };

        document.getElementById('create-project').onclick = async () => {
            const title = document.getElementById('proj-title').value.trim();
            if (!title) { alert('Title is required'); return; }
            const code = window.getEditorCode(editorId);
            const res = await API.post('/courses/projects/', {
                title: title,
                description: document.getElementById('proj-desc').value.trim(),
                code: code,
                language: document.getElementById('proj-lang').value,
            });
            if (res.ok) {
                App.navigate('projects');
            } else {
                alert('Error creating project: ' + (res.data.title?.[0] || 'Unknown error'));
            }
        };
    },

    async leaderboard() {
        const app = document.getElementById('app');
        app.innerHTML = '';
        app.appendChild(Components.pageHeader('Leaderboard', 'Top learners'));
        app.appendChild(Components.spinner());
        const { ok, data } = await API.get('/auth/leaderboard/');
        app.innerHTML = '';
        app.appendChild(Components.pageHeader('Leaderboard', 'Top learners'));
        const list = document.createElement('div');
        list.className = 'course-list';
        if (ok && data.results) {
            data.results.forEach((u, i) => {
                const card = document.createElement('div');
                card.className = 'course-card';
                const isMe = Auth.user && Auth.user.id === u.id;
                card.innerHTML = `
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div style="font-size:24px;font-weight:700;color:${i < 3 ? 'var(--accent)' : 'var(--text-muted)'};">#${i + 1}</div>
                        <div style="flex:1;">
                            <div style="font-weight:600;${isMe ? 'color:var(--accent);' : ''}">${u.username}${isMe ? ' (you)' : ''}</div>
                            <div style="font-size:12px;color:var(--text-secondary);">Level ${u.level} · ${u.xp} XP</div>
                        </div>
                    </div>
                `;
                list.appendChild(card);
            });
        } else {
            list.innerHTML = '<p style="padding:20px;text-align:center;color:var(--text-muted);">No data yet.</p>';
        }
        app.appendChild(list);
        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'dashboard'));
        if (API.isAuthenticated()) app.appendChild(Components.chatToggle());
    },

    async profile() {
        const app = document.getElementById('app');
        app.innerHTML = '';
        app.appendChild(Components.pageHeader('Profile'));
        const user = Auth.user;
        const isGuest = Auth.isGuest();
        if (!user) {
            app.innerHTML += '<p style="padding:20px;">Please log in.</p>';
            return;
        }
        if (isGuest) {
            const profile = Auth.loadGuestProfile();
            const guestCard = document.createElement('div');
            guestCard.style.cssText = 'margin:16px;padding:24px;background:var(--bg-card);border-radius:var(--radius);border:1px solid var(--border);text-align:center;';
            guestCard.innerHTML = `
                <div style="font-size:48px;margin-bottom:12px;">👤</div>
                <div style="font-size:20px;font-weight:700;margin-bottom:4px;">${profile.name || 'Guest'}</div>
                ${profile.age ? `<div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px;">Age: ${profile.age}</div>` : ''}
                ${profile.goal ? `<div style="font-size:13px;color:var(--text-secondary);margin-bottom:8px;">Goal: ${profile.goal}</div>` : ''}
                <div style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">${profile.name ? 'Browsing as a guest — sign up to save progress!' : 'You are browsing as a guest. Sign up to save progress and unlock all features!'}</div>
                <button class="btn btn-primary" onclick="App.navigate('register')">Create Free Account</button>
                <button class="btn btn-secondary" onclick="App.navigate('login')" style="margin-top:8px;">I have an account</button>
            `;
            app.appendChild(guestCard);
            app.appendChild(Components.nav([
                { id: 'dashboard', icon: '🏠', label: 'Home' },
                { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
                { id: 'profile', icon: '👤', label: 'Profile' },
            ], 'profile'));
            return;
        }
        const card = document.createElement('div');
        card.style.cssText = 'margin:16px;padding:20px;background:var(--bg-card);border-radius:var(--radius);border:1px solid var(--border);';
        const levels = ['🟢', '🔵', '🟣', '🔴', '👑'];
        card.innerHTML = `
            <div style="text-align:center;margin-bottom:16px;">
                <div style="font-size:48px;margin-bottom:8px;">${levels[Math.min(user.level - 1, 4)]}</div>
                <div style="font-size:20px;font-weight:700;">${user.username}</div>
                <div style="font-size:14px;color:var(--text-secondary);">${user.email}</div>
            </div>
            <div style="display:flex;gap:12px;">
                <div class="stat-card"><div class="value">${user.xp}</div><div class="label">Total XP</div></div>
                <div class="stat-card"><div class="value">${user.level}</div><div class="label">Level</div></div>
                <div class="stat-card"><div class="value">${user.streak_count || 0}</div><div class="label">Streak</div></div>
            </div>
            <div style="margin-top:16px;">
                <label style="font-size:12px;color:var(--text-secondary);display:block;margin-bottom:4px;">Language</label>
                <select class="form-input" id="lang-select">
                    <option value="en" ${user.preferred_language === 'en' ? 'selected' : ''}>English</option>
                    <option value="de" ${user.preferred_language === 'de' ? 'selected' : ''}>German</option>
                    <option value="tr" ${user.preferred_language === 'tr' ? 'selected' : ''}>Turkish</option>
                    <option value="ru" ${user.preferred_language === 'ru' ? 'selected' : ''}>Russian</option>
                    <option value="ar" ${user.preferred_language === 'ar' ? 'selected' : ''}>Arabic</option>
                </select>
            </div>
        `;
        app.appendChild(card);
        const btnGrp = document.createElement('div');
        btnGrp.className = 'btn-group';
        btnGrp.style.cssText = 'padding:0 16px;display:flex;flex-direction:column;gap:8px;';
        btnGrp.innerHTML = `
            <button class="btn btn-secondary" id="logout-btn">Log Out</button>
        `;
        app.appendChild(btnGrp);
        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'profile'));
        const subStatus = document.createElement('div');
        subStatus.style.cssText = 'margin:16px;padding:16px;background:var(--bg-card);border-radius:var(--radius);border:1px solid var(--border);';
        subStatus.innerHTML = '<div style="text-align:center;"><div style="font-size:13px;color:var(--text-secondary);">Loading subscription...</div></div>';
        app.appendChild(subStatus);
        (async () => {
            const res = await API.get('/subscriptions/my/');
            if (res.ok && res.data.plan) {
                subStatus.innerHTML = `
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <div style="font-size:12px;color:var(--text-secondary);">Plan</div>
                            <div style="font-weight:600;">${res.data.plan.name}</div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-size:12px;color:var(--text-secondary);">Status</div>
                            <div style="font-weight:600;color:var(--success);">${res.data.status}</div>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-secondary" id="upgrade-btn" style="margin-top:12px;width:100%;">Upgrade Plan</button>
                `;
                document.getElementById('upgrade-btn').onclick = () => App.navigate('pricing');
            } else {
                subStatus.innerHTML = `
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <div style="font-size:12px;color:var(--text-secondary);">Free Plan</div>
                            <div style="font-size:11px;color:var(--text-muted);">Upgrade for unlimited access</div>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-primary" id="upgrade-btn" style="margin-top:12px;width:100%;">View Plans</button>
                `;
                document.getElementById('upgrade-btn').onclick = () => App.navigate('pricing');
            }
        })();

        document.getElementById('logout-btn').onclick = () => Auth.logout();
        document.getElementById('lang-select').onchange = async (e) => {
            await API.patch('/auth/me/', { preferred_language: e.target.value });
            Auth.user.preferred_language = e.target.value;
        };
    },

    async pricing() {
        const app = document.getElementById('app');
        app.innerHTML = '';
        app.appendChild(Components.pageHeader('Pricing', 'Choose your plan'));
        const { ok, data } = await API.get('/subscriptions/plans/');
        if (!ok || !data.results) {
            app.innerHTML += '<p style="padding:20px;">Could not load plans.</p>';
            return;
        }
        const list = document.createElement('div');
        list.style.cssText = 'padding: 16px; display: flex; flex-direction: column; gap: 16px;';
        data.results.forEach(plan => {
            const isFree = plan.price_monthly == 0;
            const card = document.createElement('div');
            card.style.cssText = 'background:var(--bg-card);border-radius:var(--radius);padding:24px;border:1px solid var(--border);';
            if (!isFree) card.style.borderColor = 'var(--accent)';
            card.innerHTML = `
                <div style="font-size:18px;font-weight:700;margin-bottom:4px;">${plan.name}</div>
                <div style="font-size:36px;font-weight:800;color:var(--accent);margin-bottom:4px;">
                    ${isFree ? 'Free' : `$${plan.price_monthly}`}
                    ${!isFree ? '<span style="font-size:14px;font-weight:400;color:var(--text-muted);">/month</span>' : ''}
                </div>
                <div style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">${plan.description}</div>
                <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px;">
                    ${plan.features.map(f => `<div style="display:flex;align-items:center;gap:8px;font-size:13px;"><span style="color:var(--success);">✓</span> ${f}</div>`).join('')}
                </div>
                ${isFree ? `
                    <button class="btn btn-secondary" onclick="App.navigate('dashboard')">Current Plan</button>
                ` : `
                    <button class="btn btn-primary" id="select-plan-${plan.id}">Subscribe Now</button>
                `}
            `;
            list.appendChild(card);
            if (!isFree) {
                setTimeout(() => {
                    document.getElementById(`select-plan-${plan.id}`).onclick = async () => {
                        const res = await API.post('/subscriptions/subscribe/', { plan_id: plan.id });
                        if (res.ok) {
                            alert('Subscribed! Welcome to Premium!');
                            App.navigate('profile');
                        } else {
                            alert('Error: ' + (res.data.error || 'Could not subscribe'));
                        }
                    };
                }, 50);
            }
        });
        app.appendChild(list);
        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'profile'));
    },

    async login() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="auth-page">
                <div class="logo">LearnApp</div>
                <div class="tagline">Learn Python. Build the future.</div>
                <div class="form-group">
                    <label>Username or Email</label>
                    <input class="form-input" id="login-user" placeholder="Enter username" autocomplete="username">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input class="form-input" id="login-pass" type="password" placeholder="Enter password" autocomplete="current-password">
                </div>
                <button class="btn btn-primary" id="login-btn">Log In</button>
                <div style="margin:16px 0;text-align:center;color:var(--text-muted);">or continue with</div>
                <button class="btn btn-secondary" id="google-login" style="margin-bottom:8px;">
                    <span style="font-size:18px;">G</span> Sign in with Google
                </button>
                <div style="margin:12px 0;position:relative;text-align:center;">
                    <div style="border-top:1px solid var(--border);margin:16px 0;"></div>
                    <span style="position:relative;top:-24px;background:var(--bg-primary);padding:0 12px;color:var(--text-muted);font-size:12px;">or</span>
                </div>
                <button class="btn btn-secondary" id="guest-btn" style="margin-bottom:8px;">
                    👤 Continue as Guest
                </button>
                <div class="form-link">Don't have an account? <a id="go-register">Sign up</a></div>
                <div id="login-error" style="color:var(--error);font-size:13px;margin-top:12px;"></div>
                <div class="form-link" style="margin-top:8px;"><a id="go-dashboard">← Back to Dashboard</a></div>
            </div>
        `;
        document.getElementById('login-btn').onclick = async () => {
            const username = document.getElementById('login-user').value;
            const password = document.getElementById('login-pass').value;
            const err = document.getElementById('login-error');
            err.textContent = '';
            const result = await Auth.login(username, password);
            if (result.ok) {
                App.navigate('dashboard');
            } else err.textContent = result.error;
        };
        document.getElementById('login-pass').onkeydown = (e) => {
            if (e.key === 'Enter') document.getElementById('login-btn').click();
        };
        document.getElementById('google-login').onclick = () => {
            window.location.href = '/accounts/google/login/';
        };
        document.getElementById('guest-btn').onclick = () => {
            Auth.enableGuest();
            App.navigate('dashboard');
        };
        document.getElementById('go-register').onclick = () => App.navigate('register');
        document.getElementById('go-dashboard').onclick = () => App.navigate('dashboard');
    },

    async register() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="auth-page">
                <div class="logo">LearnApp</div>
                <div class="tagline">Start your journey today</div>
                <div class="form-group">
                    <label>Username</label>
                    <input class="form-input" id="reg-user" placeholder="Choose a username" autocomplete="username">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input class="form-input" id="reg-email" type="email" placeholder="your@email.com" autocomplete="email">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input class="form-input" id="reg-pass" type="password" placeholder="Min 8 characters" autocomplete="new-password">
                </div>
                <div class="form-group">
                    <label>Preferred Language</label>
                    <select class="form-input" id="reg-lang">
                        <option value="en">English</option>
                        <option value="de">German</option>
                        <option value="tr">Turkish</option>
                        <option value="ru">Russian</option>
                        <option value="ar">Arabic</option>
                    </select>
                </div>
                <button class="btn btn-primary" id="reg-btn">Create Account</button>
                <div class="form-link">Already have an account? <a id="go-login">Log in</a></div>
                <div id="reg-error" style="color:var(--error);font-size:13px;margin-top:12px;"></div>
                <div class="form-link" style="margin-top:8px;"><a id="go-dashboard">← Back to Dashboard</a></div>
            </div>
        `;
        document.getElementById('reg-btn').onclick = async () => {
            const username = document.getElementById('reg-user').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-pass').value;
            const lang = document.getElementById('reg-lang').value;
            const err = document.getElementById('reg-error');
            err.textContent = '';
            if (!username || !email || !password) { err.textContent = 'All fields required'; return; }
            const result = await Auth.register(username, email, password, lang);
            if (result.ok) {
                App.navigate('dashboard');
            } else err.textContent = result.error;
        };
        document.getElementById('go-login').onclick = () => App.navigate('login');
        document.getElementById('go-dashboard').onclick = () => App.navigate('dashboard');
    },

    async roadmap() {
        const app = document.getElementById('app');
        app.innerHTML = '';
        app.appendChild(Components.spinner());
        const { ok, data } = await API.get('/auth/my-roadmap/');
        app.innerHTML = '';
        if (!ok) {
            app.innerHTML = '<p style="padding:20px;">Could not load your roadmap. <a style="color:var(--accent);cursor:pointer;" onclick="App.navigate(\'dashboard\')">Back to dashboard</a></p>';
            return;
        }
        const header = document.createElement('div');
        header.className = 'page-header';
        header.innerHTML = `<h1>Your Roadmap</h1><div class="subtitle">${data.title}</div>`;
        app.appendChild(header);
        const desc = document.createElement('div');
        desc.style.cssText = 'padding:0 16px 16px;font-size:14px;color:var(--text-secondary);';
        desc.textContent = data.description;
        app.appendChild(desc);
        const progress = Math.round((data.progress / data.total) * 100) || 0;
        const progressBar = document.createElement('div');
        progressBar.style.cssText = 'margin:0 16px 16px;';
        progressBar.innerHTML = `
            <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-secondary);margin-bottom:4px;">
                <span>Progress</span><span>${data.progress}/${data.total} milestones</span>
            </div>
            <div style="height:6px;background:var(--bg-card);border-radius:3px;overflow:hidden;">
                <div style="height:100%;width:${progress}%;background:var(--accent);border-radius:3px;transition:width 0.5s;"></div>
            </div>
        `;
        app.appendChild(progressBar);
        (data.milestones || []).forEach((m, i) => {
            const card = document.createElement('div');
            card.style.cssText = 'margin:8px 16px;padding:14px;background:var(--bg-card);border-radius:var(--radius-sm);border:1px solid var(--border);display:flex;align-items:center;gap:12px;';
            const status = m.completed ? '✅' : `${i + 1}`;
            card.innerHTML = `
                <div style="width:32px;height:32px;border-radius:50%;background:${m.completed ? 'var(--success-bg, rgba(0,200,83,0.1))' : 'var(--bg-primary)'};border:2px solid ${m.completed ? 'var(--success, #00c853)' : 'var(--border)'};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${m.completed ? 'var(--success, #00c853)' : 'var(--text-secondary)'};">${status}</div>
                <div style="flex:1;"><div style="font-weight:500;">${m.title}</div><div style="font-size:12px;color:var(--text-secondary);">${m.description || ''}</div></div>
            `;
            app.appendChild(card);
        });
        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'dashboard'));
    },
};
