const FALLBACK_COURSES = [
    { title: 'Python Basics', slug: 'python-basics', short_description: 'Start here! Learn variables, loops, and functions.', difficulty: 'beginner', module_count: 6, lesson_count: 30 },
    { title: 'Data Structures', slug: 'data-structures', short_description: 'Lists, dictionaries, sets, and tuples.', difficulty: 'beginner', module_count: 6, lesson_count: 30 },
    { title: 'Web Scraping', slug: 'web-scraping', short_description: 'Extract data from websites with Python.', difficulty: 'intermediate', module_count: 6, lesson_count: 30 },
    { title: 'APIs & Automation', slug: 'apis-automation', short_description: 'Build APIs and automate workflows.', difficulty: 'intermediate', module_count: 6, lesson_count: 30 },
];

const COURSE_STRUCTURE = {
    'python-basics': {
        modules: [
            { title: 'Welcome to Python', desc: 'Get started with Python — install it, write your first program, and explore the REPL.' },
            { title: 'Variables & Data Types', desc: 'Understand variables, numbers, strings, and booleans.' },
            { title: 'Control Flow', desc: 'Master if/else, loops, and logical operators.' },
            { title: 'Functions & Scope', desc: 'Write reusable code with functions, parameters, and return values.' },
            { title: 'Lists & Dictionaries', desc: 'Store and manipulate collections of data.' },
            { title: 'Modules & File I/O', desc: 'Import modules, read/write files, and build real programs.' },
        ],
    },
    'data-structures': {
        modules: [
            { title: 'Lists & List Operations', desc: 'Create, slice, and manipulate lists.' },
            { title: 'Tuples & Sequences', desc: 'Immutable sequences and when to use them.' },
            { title: 'Dictionaries & Mapping', desc: 'Key-value stores and dictionary methods.' },
            { title: 'Sets & Set Operations', desc: 'Unique collections and mathematical set ops.' },
            { title: 'Strings & Bytes', desc: 'String manipulation, formatting, and byte handling.' },
            { title: 'Advanced Data Structures', desc: 'Collections module, defaultdict, Counter, and more.' },
        ],
    },
    'web-scraping': {
        modules: [
            { title: 'HTTP & The Web', desc: 'Understand requests, responses, and the HTTP protocol.' },
            { title: 'HTML Parsing', desc: 'Parse HTML with BeautifulSoup and extract data.' },
            { title: 'Advanced Scraping', desc: 'Handle forms, sessions, and pagination.' },
            { title: 'Dynamic Content', desc: 'Scrape JavaScript-rendered pages with Selenium.' },
            { title: 'Data Processing', desc: 'Clean, transform, and store scraped data.' },
            { title: 'Scraping at Scale', desc: 'Rate limiting, proxies, and ethical scraping.' },
        ],
    },
    'apis-automation': {
        modules: [
            { title: 'REST API Fundamentals', desc: 'Understand REST principles and API design.' },
            { title: 'Authentication & Security', desc: 'API keys, OAuth, and secure endpoints.' },
            { title: 'Building API Clients', desc: 'Write Python clients to consume APIs.' },
            { title: 'Automation Patterns', desc: 'Script repetitive tasks and workflows.' },
            { title: 'Scheduling & Monitoring', desc: 'Schedule tasks and monitor their execution.' },
            { title: 'Production Deployment', desc: 'Deploy APIs and automation to the cloud.' },
        ],
    },
};

const LESSON_TOPICS = [
    'Introduction & Setup',
    'Core Concepts',
    'Working with Data',
    'Advanced Techniques',
    'Practice & Review',
];

function generateLessonContent(moduleTitle, lessonNum, courseSlug) {
    const topics = {
        1: `## ${moduleTitle} — Introduction\n\nWelcome to **${moduleTitle}**! In this lesson, you'll learn the foundational concepts.\n\n### What you'll learn:\n- Key terminology and concepts\n- Setting up your environment\n- First practical example\n\n### Example\n\`\`\`python\n# Getting started\nprint("Welcome to ${moduleTitle}!")\n\`\`\`\n\n### Try it yourself\nOpen the code editor and experiment with the examples above.`,
        2: `## ${moduleTitle} — Core Concepts\n\nNow let's dive deeper into the core ideas behind **${moduleTitle}**.\n\n### Key Points\n- Understanding the underlying principles\n- Common patterns and best practices\n- How it fits into the bigger picture\n\n### Example\n\`\`\`python\n# Core concepts in action\nresult = 42\nprint(f"The answer is {result}")\n\`\`\`\n\nComplete the exercises to reinforce your understanding.`,
        3: `## ${moduleTitle} — Working with Data\n\nLearn how to work with real data using the techniques from **${moduleTitle}**.\n\n### Data Handling\n- Reading and preparing data\n- Transforming inputs into outputs\n- Handling edge cases\n\n### Example\n\`\`\`python\n# Data processing example\ndata = [1, 2, 3, 4, 5]\nprocessed = [x * 2 for x in data]\nprint(processed)\n\`\`\`\n\nPractice with different data sets to build confidence.`,
        4: `## ${moduleTitle} — Advanced Techniques\n\nLevel up your skills with advanced techniques in **${moduleTitle}**.\n\n### Advanced Topics\n- Optimization strategies\n- Real-world patterns\n- Common pitfalls and how to avoid them\n\n### Example\n\`\`\`python\n# Advanced pattern\ndef process_items(items):\n    return [transform(item) for item in items if condition(item)]\n\n# Test it\nresult = process_items([1, 2, 3, 4, 5])\n\`\`\`\n\nMaster these concepts to write production-quality code.`,
        5: `## ${moduleTitle} — Practice & Review\n\nPut everything together with a comprehensive review of **${moduleTitle}**.\n\n### Review Questions\n1. What are the key concepts covered?\n2. How do the pieces fit together?\n3. Can you build a complete solution?\n\n### Challenge\n\`\`\`python\n# Final challenge: build a complete solution\ndef solve(input_data):\n    # Your implementation here\n    pass\n\n# Test your solution\ntest_data = "example"\nprint(solve(test_data))\n\`\`\`\n\n### Summary\nAfter completing this module, you should be comfortable with all aspects of ${moduleTitle}. Move on to the next module when you're ready!`,
    };
    return topics[lessonNum] || topics[1];
}

function generateQuizQuestions(moduleTitle, moduleId) {
    const questions = [
        {
            id: moduleId * 100 + 1,
            question_text: `Which of the following best describes a core concept of "${moduleTitle}"?`,
            answers: [
                { id: moduleId * 1000 + 1, answer_text: `The fundamental principle of ${moduleTitle.toLowerCase()}`, is_correct: true },
                { id: moduleId * 1000 + 2, answer_text: 'An unrelated programming concept', is_correct: false },
                { id: moduleId * 1000 + 3, answer_text: 'A database management technique', is_correct: false },
            ],
        },
        {
            id: moduleId * 100 + 2,
            question_text: `What is the most common use case for ${moduleTitle} in Python?`,
            answers: [
                { id: moduleId * 1000 + 4, answer_text: 'Data manipulation and automation', is_correct: false },
                { id: moduleId * 1000 + 5, answer_text: `Applying ${moduleTitle.toLowerCase()} concepts to solve problems`, is_correct: true },
                { id: moduleId * 1000 + 6, answer_text: 'Hardware driver development', is_correct: false },
            ],
        },
        {
            id: moduleId * 100 + 3,
            question_text: `When working with ${moduleTitle}, which practice is most important?`,
            answers: [
                { id: moduleId * 1000 + 7, answer_text: 'Writing clean, readable code with proper error handling', is_correct: true },
                { id: moduleId * 1000 + 8, answer_text: 'Using as many libraries as possible', is_correct: false },
                { id: moduleId * 1000 + 9, answer_text: 'Avoiding comments in your code', is_correct: false },
            ],
        },
    ];
    return questions;
}

function getOrBuildMockCourse(slug) {
    if (window.__mockCourses && window.__mockCourses[slug]) return window.__mockCourses[slug];
    const structure = COURSE_STRUCTURE[slug];
    const base = FALLBACK_COURSES.find(c => c.slug === slug);
    if (!structure || !base) return null;
    if (!window.__mockCourses) window.__mockCourses = {};
    const course = { ...base };
    course.modules = structure.modules.map((mod, mi) => {
        const moduleId = mi + 1;
        const lessons = [];
        for (let li = 1; li <= 5; li++) {
            const lessonId = moduleId * 100 + li;
            lessons.push({
                id: lessonId,
                title: `${mod.title} — ${LESSON_TOPICS[li - 1]}`,
                lesson_type: 'text',
                xp_reward: 10,
                content: generateLessonContent(mod.title, li, slug),
            });
        }
        const quizId = moduleId * 100 + 10;
        const quiz = {
            id: quizId,
            title: `${mod.title} Quiz`,
            xp_reward: 25,
            questions: generateQuizQuestions(mod.title, moduleId),
        };
        return { id: moduleId, title: mod.title, description: mod.desc, lessons, quiz };
    });
    course.module_count = 6;
    course.lesson_count = 30;
    window.__mockCourses[slug] = course;
    return course;
}

function findMockLesson(courseSlug, lessonId) {
    const course = getOrBuildMockCourse(courseSlug);
    if (!course) return null;
    for (const mod of course.modules) {
        const lesson = mod.lessons.find(l => l.id == lessonId);
        if (lesson) return { lesson, module: mod, course };
    }
    return null;
}

function findMockQuiz(courseSlug, quizId) {
    const course = getOrBuildMockCourse(courseSlug);
    if (!course) return null;
    for (const mod of course.modules) {
        if (mod.quiz.id == quizId) return { quiz: mod.quiz, module: mod, course };
    }
    return null;
}

function getAllMockCourses() {
    return FALLBACK_COURSES.map(c => getOrBuildMockCourse(c.slug)).filter(Boolean);
}

function getGuestProgress(slug) {
    try {
        const all = JSON.parse(localStorage.getItem('learnapp_progress') || '{}');
        return all[slug] || { lessons: [], quizzes: [] };
    } catch { return { lessons: [], quizzes: [] }; }
}

function markGuestProgress(slug, type, id) {
    const all = JSON.parse(localStorage.getItem('learnapp_progress') || '{}');
    if (!all[slug]) all[slug] = { lessons: [], quizzes: [] };
    if (type === 'lesson' && !all[slug].lessons.includes(id)) all[slug].lessons.push(id);
    if (type === 'quiz' && !all[slug].quizzes.includes(id)) all[slug].quizzes.push(id);
    localStorage.setItem('learnapp_progress', JSON.stringify(all));
}

const Pages = {
    async dashboard() {
        const app = document.getElementById('app');
        app.innerHTML = '';

        app.appendChild(Components.pageHeader('LearnApp', 'Learn Python interactively'));

        if (Auth.isGuest()) {
            app.appendChild(Components.guestNotification());
        }

        if (Auth.user) {
            const isGuest = Auth.isGuest();
            app.appendChild(Components.statCards([
                { value: isGuest ? '0 XP' : Auth.user.xp, label: 'XP' },
                { value: isGuest ? 'Level 1' : Auth.user.level, label: 'Level' },
                { value: isGuest ? '0' : (Auth.user.streak_count || 0), label: 'Day Streak' },
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
            getAllMockCourses().forEach(c => container.appendChild(Components.courseCard(c)));
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
        app.appendChild(Components.spinner());

        const isGuest = Auth.isGuest();
        let course = null;

        const { ok, data } = await API.get(`/courses/${slug}/`);
        if (ok && data && data.modules) {
            course = data;
        } else {
            const mock = getOrBuildMockCourse(slug);
            if (mock) course = mock;
        }

        app.innerHTML = '';
        if (!course) {
            app.innerHTML = '<p style="padding:20px;">Course not found. <a style="color:var(--accent);cursor:pointer;" onclick="App.navigate(\'dashboard\')">Back to dashboard</a></p>';
            return;
        }

        const progress = isGuest ? getGuestProgress(slug) : { lessons: [], quizzes: [] };

        app.appendChild(Components.backButton());

        const header = document.createElement('div');
        header.className = 'page-header';
        header.innerHTML = `<h1>${course.title}</h1><p style="color:var(--text-secondary);font-size:13px;">${course.short_description || course.description || ''}</p>`;
        app.appendChild(header);

        const stats = document.createElement('div');
        stats.className = 'stats-bar';
        const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0);
        const totalQuizzes = course.modules.filter(m => m.quiz).length;
        const doneLessons = (progress.lessons || []).length;
        const doneQuizzes = (progress.quizzes || []).length;
        stats.innerHTML = `
            <div class="stat-card"><div class="value">${doneLessons}/${totalLessons}</div><div class="label">Lessons</div></div>
            <div class="stat-card"><div class="value">${doneQuizzes}/${totalQuizzes}</div><div class="label">Quizzes</div></div>
            <div class="stat-card"><div class="value">${course.modules.length}</div><div class="label">Modules</div></div>
        `;
        app.appendChild(stats);

        const modTitle = document.createElement('div');
        modTitle.style.cssText = 'padding:16px 16px 4px;font-size:14px;font-weight:600;color:var(--text-secondary);';
        modTitle.textContent = '📋 Course Modules';
        app.appendChild(modTitle);

        course.modules.forEach(mod => {
            app.appendChild(Components.moduleCard(mod, slug, progress));
        });

        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'dashboard'));

        if (!isGuest) app.appendChild(Components.chatToggle());
    },

    async lessonDetail(lessonId) {
        const app = document.getElementById('app');
        app.innerHTML = '';
        app.appendChild(Components.spinner());

        const isGuest = Auth.isGuest();
        const ctx = NavContext.get();
        let lesson = null;
        let courseSlug = ctx.courseSlug;
        let course = null;
        let mod = null;
        let lessonIndex = -1;

        if (courseSlug) {
            const mock = getOrBuildMockCourse(courseSlug);
            if (mock) {
                for (const m of mock.modules) {
                    const idx = m.lessons.findIndex(l => l.id == lessonId);
                    if (idx !== -1) { lesson = m.lessons[idx]; mod = m; course = mock; lessonIndex = idx; break; }
                }
            }
        }

        if (!lesson) {
            const coursesRes = await API.get('/courses/');
            if (coursesRes.ok) {
                for (const c of (coursesRes.data.results || [])) {
                    const modRes = await API.get(`/courses/${c.slug}/`);
                    if (modRes.ok && modRes.data.modules) {
                        for (const m of modRes.data.modules) {
                            for (const l of (m.lessons || [])) {
                                if (l.id == lessonId) { lesson = l; course = modRes.data; mod = m; courseSlug = c.slug; break; }
                            }
                            if (lesson) break;
                        }
                    }
                    if (lesson) break;
                }
            }
        }

        if (!lesson && !courseSlug) {
            for (const fc of FALLBACK_COURSES) {
                const mock = getOrBuildMockCourse(fc.slug);
                if (mock) {
                    for (const m of mock.modules) {
                        const idx = m.lessons.findIndex(l => l.id == lessonId);
                        if (idx !== -1) { lesson = m.lessons[idx]; mod = m; course = mock; courseSlug = fc.slug; lessonIndex = idx; break; }
                    }
                    if (lesson) break;
                }
            }
        }

        app.innerHTML = '';
        if (!lesson) { app.innerHTML = '<p style="padding:20px;">Lesson not found</p>'; return; }

        const progress = isGuest && courseSlug ? getGuestProgress(courseSlug) : { lessons: [], quizzes: [] };
        const completed = (progress.lessons || []).includes(lesson.id);

        app.appendChild(Components.backButton());
        const header = Components.pageHeader(lesson.title, `+${lesson.xp_reward} XP`);
        app.appendChild(header);

        if (mod) {
            const progressInfo = document.createElement('div');
            progressInfo.style.cssText = 'padding:0 16px 8px;font-size:12px;color:var(--text-secondary);display:flex;align-items:center;justify-content:space-between;';
            const count = (progress.lessons || []).filter(id => Math.floor(id / 100) === mod.id).length;
            progressInfo.innerHTML = `
                <span>📂 ${mod.title} — Lesson ${lessonIndex + 1} of ${mod.lessons.length}</span>
                <span style="color:var(--text-muted);">${count}/${mod.lessons.length} completed</span>
            `;
            app.appendChild(progressInfo);
        }

        const content = document.createElement('div');
        content.className = 'content-page';
        content.innerHTML = lesson.content;
        app.appendChild(content);

        const btnGrp = document.createElement('div');
        btnGrp.className = 'btn-group';

        let prevLesson = null;
        let nextLesson = null;
        if (mod) {
            if (lessonIndex > 0) prevLesson = mod.lessons[lessonIndex - 1];
            if (lessonIndex < mod.lessons.length - 1) nextLesson = mod.lessons[lessonIndex + 1];
        }

        let navHtml = '<div style="display:flex;gap:8px;width:100%;">';
        if (prevLesson) {
            navHtml += `<button class="btn btn-sm btn-secondary" id="prev-lesson" style="flex:1;">← ${prevLesson.title}</button>`;
        }
        navHtml += `<button class="btn btn-primary" id="complete-lesson" style="flex:1;">${completed ? '✅ Completed' : 'Mark Complete'}</button>`;
        if (nextLesson) {
            navHtml += `<button class="btn btn-sm btn-secondary" id="next-lesson" style="flex:1;">${nextLesson.title} →</button>`;
        }
        navHtml += '</div>';
        btnGrp.innerHTML = navHtml;
        app.appendChild(btnGrp);

        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'dashboard'));

        document.getElementById('complete-lesson').onclick = async () => {
            if (completed) return;
            if (isGuest && courseSlug) {
                markGuestProgress(courseSlug, 'lesson', lesson.id);
                document.getElementById('complete-lesson').textContent = '✅ Completed';
                return;
            }
            if (courseSlug && lesson) {
                const { ok, data } = await API.post(`/courses/${courseSlug}/lessons/${lesson.slug || lesson.id}/complete/`);
                if (ok) {
                    const overlay = Components.resultOverlay(data, '');
                    document.body.appendChild(overlay);
                    document.getElementById('complete-lesson').textContent = '✅ Completed';
                }
            }
        };

        if (prevLesson) {
            document.getElementById('prev-lesson').onclick = () => {
                NavContext.set(courseSlug, mod.id);
                App.navigate(`lesson/${prevLesson.id}`);
            };
        }
        if (nextLesson) {
            document.getElementById('next-lesson').onclick = () => {
                NavContext.set(courseSlug, mod.id);
                App.navigate(`lesson/${nextLesson.id}`);
            };
        }
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
        app.appendChild(Components.spinner());

        const isGuest = Auth.isGuest();
        const ctx = NavContext.get();
        let quiz = null;
        let courseSlug = ctx.courseSlug;
        let course = null;
        let mod = null;

        if (courseSlug) {
            const found = findMockQuiz(courseSlug, quizId);
            if (found) { quiz = found.quiz; mod = found.module; course = found.course; }
        }

        if (!quiz) {
            const coursesRes = await API.get('/courses/');
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
        }

        if (!quiz && !courseSlug) {
            for (const fc of FALLBACK_COURSES) {
                const found = findMockQuiz(fc.slug, quizId);
                if (found) { quiz = found.quiz; mod = found.module; course = found.course; courseSlug = fc.slug; break; }
            }
        }

        app.innerHTML = '';
        if (!quiz) { app.innerHTML = '<p style="padding:20px;">Quiz not found</p>'; return; }

        const answers = {};
        const progress = isGuest && courseSlug ? getGuestProgress(courseSlug) : { lessons: [], quizzes: [] };
        const quizDone = (progress.quizzes || []).includes(quiz.id);

        app.appendChild(Components.backButton());
        app.appendChild(Components.pageHeader(quiz.title || 'Quiz', `+${quiz.xp_reward || 25} XP`));

        if (mod) {
            const modInfo = document.createElement('div');
            modInfo.style.cssText = 'padding:0 16px 8px;font-size:12px;color:var(--text-secondary);';
            modInfo.textContent = `📂 ${mod.title} — Complete this quiz to finish the module`;
            app.appendChild(modInfo);
        }

        const form = document.createElement('div');
        form.className = 'content-page';
        const qs = quiz.questions || [];
        if (qs.length === 0) { form.innerHTML = '<p style="color:var(--text-muted);">No questions in this quiz.</p>'; }
        qs.forEach((q, qi) => {
            const div = document.createElement('div');
            div.className = 'quiz-question';
            div.innerHTML = `<div class="q-text">${qi + 1}. ${q.question_text}</div>`;
            (q.answers || []).forEach(a => {
                const opt = document.createElement('div');
                opt.className = 'quiz-option';
                if (quizDone && a.is_correct) opt.classList.add('correct');
                opt.dataset.qid = q.id;
                opt.dataset.aid = a.id;
                opt.innerHTML = `<div class="radio"></div><span>${a.answer_text}</span>`;
                opt.onclick = () => {
                    if (quizDone) return;
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
        if (quizDone) {
            btnGrp.innerHTML = '<p style="text-align:center;color:var(--success);font-size:13px;">✅ Quiz completed</p>';
        } else {
            btnGrp.innerHTML = '<button class="btn btn-primary" id="submit-quiz">Submit Quiz</button>';
        }
        app.appendChild(btnGrp);

        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'quiz'));

        if (!quizDone) {
            document.getElementById('submit-quiz').onclick = async () => {
                const ansList = Object.entries(answers).map(([qid, aid]) => ({
                    question_id: parseInt(qid),
                    answer_id: parseInt(aid),
                }));
                if (ansList.length < qs.length) {
                    alert('Please answer all questions');
                    return;
                }
                let correctCount = 0;
                qs.forEach(q => {
                    const correctId = q.answers.find(a => a.is_correct)?.id;
                    const selectedId = answers[q.id];
                    const options = document.querySelectorAll(`.quiz-option[data-qid="${q.id}"]`);
                    options.forEach(o => {
                        if (parseInt(o.dataset.aid) === correctId) o.classList.add('correct');
                        else if (o.classList.contains('selected') && parseInt(o.dataset.aid) !== correctId) o.classList.add('wrong');
                    });
                    if (selectedId === correctId) correctCount++;
                });

                if (isGuest && courseSlug) {
                    markGuestProgress(courseSlug, 'quiz', quiz.id);
                }

                const passed = correctCount >= Math.ceil(qs.length / 2);
                setTimeout(() => {
                    const overlay = Components.resultOverlay({
                        passed,
                        success: passed,
                        title: passed ? '🎉 Quiz Passed!' : 'Keep Trying!',
                        message: `You got ${correctCount}/${qs.length} correct!`,
                        xp_earned: passed ? (quiz.xp_reward || 25) : 0,
                        total_xp: 0,
                    }, '');
                    document.body.appendChild(overlay);
                }, 1000);
            };
        }
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
        btnGrp.innerHTML = '<button class="btn btn-secondary" id="logout-btn">Log Out</button>';
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

    async settings() {
        const app = document.getElementById('app');
        app.innerHTML = '';
        app.appendChild(Components.pageHeader('Settings'));

        const isGuest = Auth.isGuest();
        const profile = Auth.loadGuestProfile();

        const container = document.createElement('div');
        container.style.cssText = 'padding: 16px; display: flex; flex-direction: column; gap: 20px;';

        // Personal Info Section
        const infoSection = document.createElement('div');
        infoSection.style.cssText = 'background:var(--bg-card);border-radius:var(--radius);padding:20px;border:1px solid var(--border);';
        infoSection.innerHTML = `
            <h3 style="margin:0 0 16px;font-size:16px;">👤 Personal Info</h3>
            <div class="form-group">
                <label>Name</label>
                <input class="form-input" id="set-name" value="${profile.name || ''}" ${isGuest ? '' : 'disabled'} placeholder="Your name">
            </div>
            <div class="form-group">
                <label>Age</label>
                <input class="form-input" id="set-age" type="number" min="1" max="150" value="${profile.age || ''}" ${isGuest ? '' : 'disabled'} placeholder="Your age">
            </div>
            <div class="form-group">
                <label>Learning Goal</label>
                <select class="form-input" id="set-goal" ${isGuest ? '' : 'disabled'}>
                    <option value="">Select a goal...</option>
                    <option value="learn" ${profile.goal === 'learn' ? 'selected' : ''}>Learn programming from scratch</option>
                    <option value="job" ${profile.goal === 'job' ? 'selected' : ''}>Get a developer job</option>
                    <option value="ai" ${profile.goal === 'ai' ? 'selected' : ''}>Build AI tools and models</option>
                    <option value="automate" ${profile.goal === 'automate' ? 'selected' : ''}>Automate repetitive tasks</option>
                    <option value="web" ${profile.goal === 'web' ? 'selected' : ''}>Create websites and web apps</option>
                    <option value="apps" ${profile.goal === 'apps' ? 'selected' : ''}>Build desktop/mobile apps</option>
                </select>
            </div>
            ${isGuest ? '<button class="btn btn-primary" id="save-profile-btn" style="width:100%;">Save Profile</button>' : '<p style="font-size:13px;color:var(--text-muted);">Edit your profile in your account settings after signing up.</p>'}
        `;
        container.appendChild(infoSection);

        // Preferences Section
        const prefsSection = document.createElement('div');
        prefsSection.style.cssText = 'background:var(--bg-card);border-radius:var(--radius);padding:20px;border:1px solid var(--border);';
        const savedNotif = localStorage.getItem('notifications_enabled') !== 'false';
        const savedTheme = localStorage.getItem('theme') || 'dark';
        prefsSection.innerHTML = `
            <h3 style="margin:0 0 16px;font-size:16px;">⚙️ Preferences</h3>
            <div class="form-group">
                <label>Language</label>
                <select class="form-input" id="set-lang">
                    <option value="en" ${(Auth.user?.preferred_language || 'en') === 'en' ? 'selected' : ''}>English</option>
                    <option value="de" ${Auth.user?.preferred_language === 'de' ? 'selected' : ''}>German</option>
                    <option value="tr" ${Auth.user?.preferred_language === 'tr' ? 'selected' : ''}>Turkish</option>
                    <option value="ru" ${Auth.user?.preferred_language === 'ru' ? 'selected' : ''}>Russian</option>
                    <option value="ar" ${Auth.user?.preferred_language === 'ar' ? 'selected' : ''}>Arabic</option>
                </select>
            </div>
            <div class="form-group" style="display:flex;align-items:center;justify-content:space-between;">
                <label style="margin:0;">Theme</label>
                <div style="display:flex;gap:8px;">
                    <button class="btn btn-sm ${savedTheme === 'light' ? 'btn-primary' : 'btn-secondary'}" id="theme-light">☀️ Light</button>
                    <button class="btn btn-sm ${savedTheme === 'dark' ? 'btn-primary' : 'btn-secondary'}" id="theme-dark">🌙 Dark</button>
                </div>
            </div>
            <div class="form-group" style="display:flex;align-items:center;justify-content:space-between;">
                <label style="margin:0;">Notifications</label>
                <label style="position:relative;display:inline-block;width:44px;height:24px;">
                    <input type="checkbox" id="set-notif" ${savedNotif ? 'checked' : ''} style="opacity:0;width:0;height:0;">
                    <span style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:${savedNotif ? 'var(--accent)' : 'var(--border)'};border-radius:12px;transition:0.3s;">
                        <span style="position:absolute;content:'';height:18px;width:18px;border-radius:50%;background:white;top:3px;left:${savedNotif ? '23px' : '3px'};transition:0.3s;"></span>
                    </span>
                </label>
            </div>
        `;
        container.appendChild(prefsSection);

        // Account Section (registered users only)
        if (!isGuest) {
            const acctSection = document.createElement('div');
            acctSection.style.cssText = 'background:var(--bg-card);border-radius:var(--radius);padding:20px;border:1px solid var(--border);';
            acctSection.innerHTML = `
                <h3 style="margin:0 0 16px;font-size:16px;">🔒 Account</h3>
                <button class="btn btn-secondary" id="chg-pw-btn" style="width:100%;margin-bottom:8px;">Change Password</button>
                <button class="btn btn-secondary" id="settings-logout" style="width:100%;">Log Out</button>
            `;
            container.appendChild(acctSection);
        }

        app.appendChild(container);

        app.appendChild(Components.nav([
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'profile', icon: '👤', label: 'Profile' },
        ], 'settings'));

        // Event handlers
        if (isGuest) {
            document.getElementById('save-profile-btn').onclick = () => {
                const name = document.getElementById('set-name').value.trim();
                const age = document.getElementById('set-age').value.trim();
                const goal = document.getElementById('set-goal').value;
                if (!name) { alert('Name is required.'); return; }
                Auth.saveGuestProfile({ name, age, goal });
                alert('Profile saved!');
            };
        }

        document.getElementById('theme-light').onclick = () => {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            document.getElementById('theme-light').className = 'btn btn-sm btn-primary';
            document.getElementById('theme-dark').className = 'btn btn-sm btn-secondary';
        };
        document.getElementById('theme-dark').onclick = () => {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            document.getElementById('theme-dark').className = 'btn btn-sm btn-primary';
            document.getElementById('theme-light').className = 'btn btn-sm btn-secondary';
        };

        document.getElementById('set-notif').onchange = (e) => {
            localStorage.setItem('notifications_enabled', e.target.checked);
        };

        document.getElementById('set-lang').onchange = async (e) => {
            if (!isGuest) {
                await API.patch('/auth/me/', { preferred_language: e.target.value });
                if (Auth.user) Auth.user.preferred_language = e.target.value;
            } else {
                localStorage.setItem('preferred_language', e.target.value);
            }
        };

        if (!isGuest) {
            document.getElementById('settings-logout').onclick = () => Auth.logout();
            document.getElementById('chg-pw-btn').onclick = async () => {
                const oldPw = prompt('Current password:');
                if (!oldPw) return;
                const newPw = prompt('New password (min 8 chars):');
                if (!newPw || newPw.length < 8) { alert('Password must be at least 8 characters.'); return; }
                const result = await Auth.changePassword(oldPw, newPw);
                alert(result.ok ? 'Password changed!' : result.error || 'Error changing password');
            };
        }
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
