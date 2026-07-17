const Components = {
    nav(items, active) {
        const nav = document.createElement('nav');
        nav.className = 'nav';
        items.forEach(item => {
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
                <span>${course.module_count || 0} modules</span>
                <span>${course.lesson_count || 0} lessons</span>
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

// Monaco Editor integration
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
