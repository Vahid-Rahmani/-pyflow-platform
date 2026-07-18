const Components = {
    nav(items, active) {
        const nav = document.createElement('nav');
        nav.className = 'nav';
        const allItems = [...items, { id: 'settings', icon: '⚙️', label: I18n.t('nav.settings') }];
        allItems.forEach(item => {
            const btn = document.createElement('button');
            btn.className = `nav-item${item.id === active ? ' active' : ''}`;
            btn.innerHTML = `<span class="icon">${item.icon}</span><span>${item.label}</span>`;
            btn.onclick = () => App.navigate(item.id);
            nav.appendChild(btn);
        });
        return nav;
    },

    statCards(stats) {
        const div = document.createElement('div');
        div.className = 'stats-bar';
        stats.forEach(s => {
            div.innerHTML += `
                <div class="stat-card">
                    <div class="value">${s.value}</div>
                    <div class="label">${s.label}</div>
                </div>
            `;
        });
        return div;
    },

    courseCard(course) {
        const div = document.createElement('div');
        div.className = 'course-card';
        const badge = course.difficulty ? `<span class="badge badge-${course.difficulty}">${course.difficulty}</span>` : '';
        div.innerHTML = `
            <div class="title">${course.title}</div>
            <div class="desc">${course.short_description || ''}</div>
            <div class="meta">
                ${badge}
                <span>${course.module_count || 6} modules</span>
                <span>${course.lesson_count || 30} lessons</span>
            </div>
        `;
        div.onclick = () => App.navigate(`course/${course.slug}`);
        return div;
    },

    lessonItem(lesson, completed = false) {
        const icons = { text: '📖', code: '💻', quiz: '❓' };
        const div = document.createElement('div');
        div.className = 'lesson-item';
        div.innerHTML = `
            <div class="icon">${icons[lesson.lesson_type] || '📄'}</div>
            <div class="info">
                <div class="title">${lesson.title}</div>
                <div class="xp">+${lesson.xp_reward} XP</div>
            </div>
            <div class="status ${completed ? 'completed' : ''}">${completed ? '✅' : '⭕'}</div>
        `;
        div.onclick = () => App.navigate(`lesson/${lesson.id}`);
        return div;
    },

    moduleCard(mod, courseSlug, progress) {
        const section = document.createElement('div');
        section.className = 'module-section';
        const completedLessons = (progress.lessons || []).filter(id => Math.floor(id / 100) === mod.id).length;
        const totalLessons = mod.lessons.length;
        const quizDone = (progress.quizzes || []).includes(mod.quiz.id);
        section.innerHTML = `
            <div class="module-header">
                <div style="flex:1;">
                    <h3 style="margin:0 0 2px;font-size:15px;">${mod.title}</h3>
                    <div style="font-size:12px;color:var(--text-secondary);">${mod.description || ''}</div>
                    <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">${completedLessons}/${totalLessons} lessons · ${quizDone ? '✅ Quiz done' : '❓ Quiz'}</div>
                </div>
                <span class="arrow">▼</span>
            </div>
            <div class="module-content" style="display:none;">
                <div class="lesson-list">
                    ${mod.lessons.map(l => {
                        const done = (progress.lessons || []).includes(l.id);
                        return `
                            <div class="lesson-item" data-lesson-id="${l.id}" data-course="${courseSlug}" data-module="${mod.id}">
                                <div class="icon">📖</div>
                                <div class="info">
                                    <div class="title">${l.title}</div>
                                    <div class="xp">+${l.xp_reward} XP</div>
                                </div>
                                <div class="status ${done ? 'completed' : ''}">${done ? '✅' : '⭕'}</div>
                            </div>
                        `;
                    }).join('')}
                    <div class="lesson-item quiz-item" data-quiz-id="${mod.quiz.id}" data-course="${courseSlug}" data-module="${mod.id}" style="border-top:1px solid var(--border);margin-top:4px;padding-top:8px;">
                        <div class="icon">❓</div>
                        <div class="info">
                            <div class="title">📝 ${mod.quiz.title}</div>
                            <div class="xp">+${mod.quiz.xp_reward} XP</div>
                        </div>
                        <div class="status ${quizDone ? 'completed' : ''}">${quizDone ? '✅' : '📝'}</div>
                    </div>
                </div>
            </div>
        `;
        const header = section.querySelector('.module-header');
        const content = section.querySelector('.module-content');
        header.onclick = () => {
            const open = content.style.display !== 'none';
            content.style.display = open ? 'none' : 'block';
            header.querySelector('.arrow').classList.toggle('open', !open);
        };
        setTimeout(() => {
            section.querySelectorAll('.lesson-item').forEach(el => {
                el.onclick = (e) => {
                    e.stopPropagation();
                    NavContext.set(courseSlug, mod.id);
                    const lessonId = el.dataset.lessonId;
                    if (lessonId) App.navigate(`lesson/${lessonId}`);
                    const quizId = el.dataset.quizId;
                    if (quizId) App.navigate(`quiz/${quizId}`);
                };
            });
        }, 0);
        return section;
    },

    projectCard(project) {
        const div = document.createElement('div');
        div.className = 'course-card';
        const date = new Date(project.updated_at).toLocaleDateString();
        div.innerHTML = `
            <div class="title">${project.title}</div>
            <div class="desc">${project.description || 'No description'}</div>
            <div class="meta">
                <span>${project.language}</span>
                <span>${date}</span>
                ${project.is_public ? '<span>🌍 Public</span>' : '<span>🔒 Private</span>'}
            </div>
        `;
        div.onclick = () => App.navigate(`project/${project.id}`);
        return div;
    },

    spinner() {
        const div = document.createElement('div');
        div.className = 'loading';
        div.innerHTML = '<div class="spinner"></div>';
        return div;
    },

    resultOverlay(data, onContinue) {
        const div = document.createElement('div');
        div.className = 'result-overlay';
        const emoji = data.success || data.passed ? '🎉' : '😅';
        div.innerHTML = `
            <div class="result-card">
                <div class="emoji">${emoji}</div>
                <h2>${data.title || (data.passed ? 'Passed!' : 'Keep Trying!')}</h2>
                <p>${data.message || (data.xp_earned ? `+${data.xp_earned} XP earned!` : 'No XP earned this time.')}</p>
                ${data.xp_earned ? `<p style="color:var(--accent);font-weight:600;">Total XP: ${data.total_xp}</p>` : ''}
                <button class="btn btn-primary" onclick="this.closest('.result-overlay').remove();${onContinue ? onContinue : ''}">Continue</button>
            </div>
        `;
        return div;
    },

    codeEditor(code = '') {
        const uid = 'editor-' + Date.now();
        const section = document.createElement('div');
        section.className = 'editor-section';
        section.dataset.editorId = uid;
        section.innerHTML = `
            <div class="editor-header">
                <h3>Python Editor</h3>
                <div style="display:flex;gap:8px;">
                    <button class="btn btn-sm btn-secondary" id="review-btn-${uid}">🔍 Review</button>
                    <button class="btn btn-sm btn-primary" id="run-btn-${uid}">▶ Run</button>
                </div>
            </div>
            <div id="${uid}" class="monaco-container" style="height:300px;border:1px solid var(--border);border-radius:var(--radius-sm);"></div>
            <div class="output-box" id="output-${uid}"></div>
        `;

        setTimeout(() => {
            const container = document.getElementById(uid);
            if (container && typeof window.initMonaco === 'function') {
                window.initMonaco(uid, code);
            }
        }, 50);

        return section;
    },

    pageHeader(title, subtitle = '') {
        const div = document.createElement('div');
        div.className = 'page-header';
        div.innerHTML = `
            <div>
                <h1>${title}</h1>
                ${subtitle ? `<div class="subtitle">${subtitle}</div>` : ''}
            </div>
        `;
        return div;
    },

    backButton() {
        const btn = document.createElement('button');
        btn.className = 'btn btn-sm btn-secondary';
        btn.innerHTML = '← Back';
        btn.style.width = 'auto';
        btn.style.margin = '8px 16px';
        btn.onclick = () => window.history.back();
        return btn;
    },

    chatToggle() {
        const btn = document.createElement('button');
        btn.className = 'chat-toggle';
        btn.id = 'chat-toggle';
        btn.innerHTML = '💬';
        btn.onclick = () => {
            if (document.getElementById('chat-panel')) {
                document.getElementById('chat-panel').remove();
                return;
            }
            showChatPanel();
        };
        return btn;
    },

    guestNotification() {
        const div = document.createElement('div');
        div.style.cssText = 'margin:0 16px 12px;padding:8px 14px;background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.15);border-radius:var(--radius-sm);display:flex;align-items:center;gap:8px;font-size:13px;';
        div.innerHTML = `
            <span style="flex-shrink:0;">👤</span>
            <span style="flex:1;color:var(--text-secondary);">Browsing as guest — <a id="guest-signup-link" style="color:var(--accent);cursor:pointer;text-decoration:underline;">sign up</a> to save progress</span>
            <button id="dismiss-guest" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:16px;padding:0 4px;">✕</button>
        `;
        div.querySelector('#guest-signup-link').onclick = (e) => {
            e.preventDefault();
            App.navigate('register');
        };
        div.querySelector('#dismiss-guest').onclick = () => div.remove();
        return div;
    },

    onboardingOverlay() {
        if (document.getElementById('onboarding-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'onboarding-overlay';
        overlay.style.cssText = `
            position:fixed;top:0;left:0;right:0;bottom:0;z-index:10000;
            background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;
            padding:24px;animation:fadeIn 0.3s ease;
        `;

        const card = document.createElement('div');
        card.style.cssText = `
            background:var(--bg-primary);border-radius:var(--radius);
            padding:32px 28px;max-width:380px;width:100%;
            border:1px solid var(--border);box-shadow:0 12px 40px rgba(0,0,0,0.3);
        `;
        card.innerHTML = `
            <div style="text-align:center;margin-bottom:24px;">
                <div style="font-size:32px;margin-bottom:8px;">👋</div>
                <h2 style="font-size:20px;margin:0 0 4px;">Welcome to LearnApp</h2>
                <p style="font-size:13px;color:var(--text-secondary);margin:0;">Tell us a bit about yourself</p>
            </div>
            <div class="form-group">
                <label>Your Name</label>
                <input class="form-input" id="onb-name" placeholder="Enter your name" autocomplete="name">
            </div>
            <div class="form-group">
                <label>Your Age</label>
                <input class="form-input" id="onb-age" type="number" min="1" max="150" placeholder="Enter your age">
            </div>
            <div class="form-group">
                <label>What do you want to learn?</label>
                <select class="form-input" id="onb-goal">
                    <option value="">Select a goal...</option>
                    <option value="learn">Learn programming from scratch</option>
                    <option value="job">Get a developer job</option>
                    <option value="ai">Build AI tools and models</option>
                    <option value="automate">Automate repetitive tasks</option>
                    <option value="web">Create websites and web apps</option>
                    <option value="apps">Build desktop/mobile apps</option>
                </select>
            </div>
            <div id="onb-error" style="color:var(--error);font-size:12px;margin-bottom:8px;text-align:center;"></div>
            <button class="btn btn-primary" id="onb-submit" style="width:100%;">Get Started</button>
        `;
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        document.getElementById('onb-name').focus();

        const close = () => { overlay.remove(); };

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });

        document.getElementById('onb-submit').onclick = () => {
            const name = document.getElementById('onb-name').value.trim();
            const age = document.getElementById('onb-age').value.trim();
            const goal = document.getElementById('onb-goal').value;
            const err = document.getElementById('onb-error');
            if (!name) { err.textContent = 'Please enter your name.'; return; }
            if (!age) { err.textContent = 'Please enter your age.'; return; }
            if (!goal) { err.textContent = 'Please select a learning goal.'; return; }

            const profile = { name, age, goal };
            Auth.saveGuestProfile(profile);
            Auth.user.name = name;
            Auth.user.age = age;
            Auth.user.goal = goal;
            Auth.user.onboarding_complete = true;

            overlay.remove();

            if (App.currentPage === 'dashboard') {
                const app = document.getElementById('app');
                app.innerHTML = '';
                Pages.dashboard();
            }
        };

        document.getElementById('onb-age').onkeydown = (e) => {
            if (e.key === 'Enter') document.getElementById('onb-submit').click();
        };
    },
};

let chatHistory = [];

function showChatPanel() {
    if (document.getElementById('chat-panel')) return;
    const panel = document.createElement('div');
    panel.className = 'chat-panel';
    panel.id = 'chat-panel';
    panel.innerHTML = `
        <div class="chat-header">
            <h3>🤖 LearnApp Tutor</h3>
            <button class="chat-close" id="chat-close">✕</button>
        </div>
        <div class="chat-messages" id="chat-messages">
            <div class="chat-msg tutor">Hello! 👋 I'm your Python tutor. Ask me anything about programming!</div>
        </div>
        <div class="chat-input-area">
            <input class="chat-input" id="chat-input" placeholder="Ask me anything..." autocomplete="off">
            <button class="chat-send" id="chat-send">➤</button>
        </div>
    `;
    document.body.appendChild(panel);
    chatHistory = [];
    document.getElementById('chat-close').onclick = () => panel.remove();
    document.getElementById('chat-send').onclick = sendChatMessage;
    document.getElementById('chat-input').onkeydown = (e) => {
        if (e.key === 'Enter') sendChatMessage();
    };
    document.getElementById('chat-input').focus();
}

async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    messages.innerHTML += `<div class="chat-msg user">${escapeHtml(text)}</div>`;
    messages.scrollTop = messages.scrollHeight;

    const typing = document.createElement('div');
    typing.className = 'chat-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    const { ok, data } = await API.post('/sandbox/tutor/', {
        message: text,
        history: chatHistory,
    });

    typing.remove();

    if (ok && data.content) {
        messages.innerHTML += `<div class="chat-msg tutor">${formatTutorResponse(data.content)}</div>`;
        chatHistory.push({ role: 'user', content: text });
        chatHistory.push({ role: 'assistant', content: data.content });
    } else {
        messages.innerHTML += `<div class="chat-msg tutor">Sorry, I had trouble processing that. Please try again!</div>`;
    }
    messages.scrollTop = messages.scrollHeight;
}

function formatTutorResponse(text) {
    text = escapeHtml(text);
    text = text.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\n\n/g, '<br><br>');
    text = text.replace(/\n/g, '<br>');
    return text;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

window.monacoEditors = {};
window.monacoReady = false;

window.initMonaco = function(containerId, initialCode) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (typeof monaco !== 'undefined' && monaco.editor) {
        createMonacoEditor(containerId, initialCode);
        return;
    }

    const checkInterval = setInterval(() => {
        if (typeof monaco !== 'undefined' && monaco.editor) {
            clearInterval(checkInterval);
            createMonacoEditor(containerId, initialCode);
        }
    }, 100);

    setTimeout(() => clearInterval(checkInterval), 10000);
};

function createMonacoEditor(containerId, initialCode) {
    const container = document.getElementById(containerId);
    if (!container || window.monacoEditors[containerId]) return;

    const editor = monaco.editor.create(container, {
        value: initialCode || '# Write your Python code here\nprint("Hello, World!")',
        language: 'python',
        theme: 'vs-dark',
        fontSize: 14,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 4,
        padding: { top: 8 },
        renderLineHighlight: 'none',
        lineNumbers: 'on',
        glyphMargin: false,
        folding: false,
        lineDecorationsWidth: 8,
        lineNumbersMinChars: 3,
    });

    window.monacoEditors[containerId] = editor;
    window.monacoReady = true;
}

window.getEditorCode = function(containerId) {
    const editor = window.monacoEditors[containerId];
    return editor ? editor.getValue() : '';
};

window.setEditorCode = function(containerId, code) {
    const editor = window.monacoEditors[containerId];
    if (editor) editor.setValue(code);
};

window.destroyEditor = function(containerId) {
    const editor = window.monacoEditors[containerId];
    if (editor) {
        editor.dispose();
        delete window.monacoEditors[containerId];
    }
};

window.getEditorId = function(container) {
    if (!container) return null;
    const section = container.closest('.editor-section');
    return section ? section.dataset.editorId : null;
};

const NavContext = {
    _courseSlug: null,
    _moduleIndex: null,
    set(slug, modIndex) { this._courseSlug = slug; this._moduleIndex = modIndex; },
    get() { return { courseSlug: this._courseSlug, moduleIndex: this._moduleIndex }; },
    clear() { this._courseSlug = null; this._moduleIndex = null; },
};

// ─── Practice Terminal ────────────────────────────────────────────────
Components.practiceTerminal = function(subsectionId) {
    const uid = 'term-' + (subsectionId || Date.now());
    const container = document.createElement('div');
    container.className = 'terminal';
    container.id = uid + '-container';
    container.innerHTML = `
        <div class="terminal-header">
            <span class="terminal-dot close"></span>
            <span class="terminal-dot min"></span>
            <span class="terminal-dot max"></span>
            <span class="terminal-title">${I18n.t('lesson.terminal')}</span>
        </div>
        <div class="terminal-body" id="${uid}-body">
            <div class="terminal-output">${I18n.locale === 'fa' ? 'به ترمینال تمرین خوش آمدید! کد خود را بنویسید و Enter را بزنید.' : 'Welcome to the Practice Terminal! Write your code and press Enter.'}</div>
        </div>
        <div style="padding:4px 12px 8px;border-top:1px solid #222;display:flex;gap:8px;">
            <div class="terminal-input-line" style="flex:1;">
                <span class="terminal-prompt">>>> </span>
                <input class="terminal-input" id="${uid}-input" placeholder="${I18n.t('terminal.placeholder')}" autocomplete="off" spellcheck="false">
            </div>
            <button class="btn btn-sm btn-primary" id="${uid}-run" style="width:auto;font-size:11px;padding:4px 10px;">${I18n.t('terminal.run')}</button>
            <button class="btn btn-sm btn-secondary" id="${uid}-clear" style="width:auto;font-size:11px;padding:4px 10px;">${I18n.t('terminal.clear')}</button>
        </div>
    `;

    setTimeout(() => {
        const input = document.getElementById(`${uid}-input`);
        const body = document.getElementById(`${uid}-body`);
        const runBtn = document.getElementById(`${uid}-run`);
        const clearBtn = document.getElementById(`${uid}-clear`);

        const runCode = async () => {
            const code = input.value.trim();
            if (!code) return;
            const outputDiv = document.createElement('div');
            outputDiv.className = 'terminal-output';
            outputDiv.textContent = '⏳ Running...';
            body.appendChild(outputDiv);
            body.scrollTop = body.scrollHeight;
            const { ok, data } = await API.post('/sandbox/execute/', { code });
            outputDiv.textContent = data.output || data.error || (ok ? '✓ Done' : '✗ Error');
            outputDiv.className = `terminal-output ${ok ? '' : 'error'}`;
            body.scrollTop = body.scrollHeight;

            // Golden key: track correct terminal inputs
            if (ok && subsectionId && Auth.isAuthenticated()) {
                await API.post(`/deepdive/levels/1/subsections/${subsectionId}/earn-iq/`, {
                    amount: 5,
                    description: 'Terminal exercise completed',
                });
            }
            input.value = '';
            input.focus();
        };

        input.onkeydown = (e) => {
            if (e.key === 'Enter') runCode();
        };
        runBtn.onclick = runCode;
        clearBtn.onclick = () => {
            body.innerHTML = '';
            const welcome = document.createElement('div');
            welcome.className = 'terminal-output';
            welcome.textContent = I18n.locale === 'fa' ? 'ترمینال پاک شد.' : 'Terminal cleared.';
            body.appendChild(welcome);
        };
        input.focus();
    }, 50);

    return container;
};

// ─── Golden Key Widget ────────────────────────────────────────────────
Components.goldenKeyWidget = function(currentIQ, threshold, earned) {
    const div = document.createElement('div');
    const pct = Math.min(100, Math.round((currentIQ / threshold) * 100));
    if (earned) {
        div.className = 'golden-key-card';
        div.style.borderColor = 'var(--success)';
        div.style.background = 'linear-gradient(135deg, #1a2e1a, #1a1a2e)';
        div.innerHTML = `
            <div class="golden-key-icon">🏆</div>
            <div class="golden-key-title" style="color:var(--success);">${I18n.t('golden_key.earned')}</div>
            <div class="golden-key-desc">${currentIQ} / ${threshold} IQ ${I18n.locale === 'fa' ? 'امتیاز' : 'points'}</div>
        `;
    } else {
        div.className = 'golden-key-card';
        div.innerHTML = `
            <div class="golden-key-icon">🔑</div>
            <div class="golden-key-title">${I18n.t('golden_key.title')}</div>
            <div class="golden-key-desc">${I18n.t('golden_key.desc')}</div>
            <div class="iq-bar"><div class="iq-bar-fill" style="width:${pct}%;"></div></div>
            <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);">
                <span>${currentIQ} IQ</span>
                <span>${threshold} IQ</span>
            </div>
        `;
    }
    return div;
};

// ─── Markdown Export Button ──────────────────────────────────────────
Components.markdownExportButton = function(levelNum, subId) {
    const btn = document.createElement('button');
    btn.className = 'md-export-btn';
    btn.innerHTML = `📝 ${I18n.t('lesson.export_md')}`;
    btn.onclick = () => {
        window.open(`/api/deepdive/levels/${levelNum}/subsections/${subId}/export-markdown/`, '_blank');
    };
    return btn;
};

// ─── MCQ Question Component ──────────────────────────────────────────
Components.mcqQuestion = function(q, index, onAnswer) {
    const div = document.createElement('div');
    div.className = 'mcq-item';
    const selectedOpt = { current: null };

    div.innerHTML = `
        <div class="mcq-question">${index + 1}. ${q.question}</div>
        <div class="mcq-list" style="gap:4px;">
            ${q.options.map((o, oi) => `
                <div class="mcq-option" data-opt-index="${oi}">
                    <div class="mcq-radio"></div>
                    <span>${o.text}</span>
                </div>
            `).join('')}
        </div>
        <div class="mcq-explanation" id="mcq-exp-${index}">${q.explanation || ''}</div>
    `;

    const opts = div.querySelectorAll('.mcq-option');
    opts.forEach((el, oi) => {
        el.onclick = () => {
            if (div.querySelector('.mcq-option.correct')) return;
            opts.forEach(o => o.classList.remove('selected'));
            el.classList.add('selected');
            selectedOpt.current = oi;
            if (onAnswer) onAnswer(oi);
        };
    });

    div.showResult = function(correctIndex) {
        opts.forEach((el, oi) => {
            el.classList.remove('selected');
            if (oi === correctIndex) el.classList.add('correct');
            else if (oi === selectedOpt.current && oi !== correctIndex) el.classList.add('wrong');
        });
        const exp = div.querySelector('.mcq-explanation');
        if (exp) exp.classList.add('show');
    };

    return div;
};

// ─── Fill-in-the-Blank Component ─────────────────────────────────────
Components.fillBlankItem = function(fb, index) {
    const div = document.createElement('div');
    div.className = 'fill-blank-item';
    div.innerHTML = `
        <div class="fill-blank-sentence">${fb.sentence}</div>
        <input class="fill-blank-input" id="fb-${index}" placeholder="${I18n.locale === 'fa' ? 'پاسخ خود را بنویسید...' : 'Type your answer...'}" autocomplete="off">
        <button class="btn btn-sm btn-secondary" id="fb-check-${index}" style="width:auto;margin-top:4px;font-size:11px;">${I18n.locale === 'fa' ? 'بررسی' : 'Check'}</button>
        <span id="fb-result-${index}" style="font-size:12px;margin-left:8px;"></span>
    `;

    setTimeout(() => {
        const input = document.getElementById(`fb-${index}`);
        const checkBtn = document.getElementById(`fb-check-${index}`);
        const result = document.getElementById(`fb-result-${index}`);
        const check = () => {
            const ans = input.value.trim().toLowerCase();
            const correct = fb.answer.toLowerCase();
            if (ans === correct) {
                input.className = 'fill-blank-input correct';
                result.textContent = '✅';
                result.style.color = 'var(--success)';
            } else {
                input.className = 'fill-blank-input wrong';
                result.textContent = `❌ ${I18n.locale === 'fa' ? 'پاسخ صحیح: ' : 'Correct answer: '}${fb.answer}`;
                result.style.color = 'var(--error)';
            }
        };
        checkBtn.onclick = check;
        input.onkeydown = (e) => { if (e.key === 'Enter') check(); };
    }, 0);

    return div;
};

// ─── Writing Exercise Component ──────────────────────────────────────
Components.writingItem = function(we, index) {
    const div = document.createElement('div');
    div.className = 'writing-item';
    div.innerHTML = `
        <div class="writing-prompt">📝 ${we.prompt}</div>
        ${we.rubric ? `<div class="writing-rubric">📋 ${we.rubric}</div>` : ''}
        <textarea class="writing-textarea" id="writing-${index}" placeholder="${I18n.locale === 'fa' ? 'کد یا توضیحات خود را بنویسید...' : 'Write your code or explanation here...'}"></textarea>
    `;
    return div;
};
