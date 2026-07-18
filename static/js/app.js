const App = {
    currentPage: null,

    async init() {
        if (!API.isAuthenticated() && !Auth.isGuest()) {
            Auth.enableGuest();
        }

        // Set locale from user preference or localStorage
        const savedLocale = localStorage.getItem('preferred_language') || Auth.user?.preferred_language || 'fa';
        I18n.setLocale(savedLocale);

        await Auth.loadUser();
        const path = window.location.pathname;
        this.routePath(path);
        window.addEventListener('popstate', () => this.routePath(window.location.pathname));
    },

    routePath(path) {
        if (path === '/' || path === '') {
            this.navigate('dashboard');
            return;
        }
        const parts = path.split('/').filter(Boolean);
        if (parts.length === 1) {
            this.navigate(parts[0]);
        } else if (parts.length === 2) {
            this.navigate(`${parts[0]}/${parts[1]}`);
        } else if (parts.length === 3) {
            this.navigate(`${parts[0]}/${parts[1]}/${parts[2]}`);
        }
    },

    canAccess() {
        return API.isAuthenticated() || Auth.isGuest();
    },

    isLoggedIn() {
        return API.isAuthenticated() && !Auth.isGuest();
    },

    async navigate(page) {
        const loggedIn = this.isLoggedIn();

        if (loggedIn && (page === 'login' || page === 'register')) {
            page = 'dashboard';
        }

        this.currentPage = page;
        const parts = page.split('/');
        const base = parts[0];
        const id = parts[1];
        const id2 = parts[2];

        let url = '/';
        if (page === 'dashboard') url = '/';
        else if (page === 'levels') url = '/levels';
        else if (base === 'level') url = `/level/${id}`;
        else if (base === 'deepdive') url = `/deepdive/${id}/${id2}`;
        else url = `/${page}`;

        window.history.pushState({ page }, '', url);
        document.title = `${I18n.t('app.name')} — ${page !== 'dashboard' ? page : I18n.t('app.tagline')}`;

        switch (base) {
            case 'login': await Pages.login(); break;
            case 'register': await Pages.register(); break;
            case 'dashboard': await Pages.dashboard(); break;
            case 'levels': await Pages.levels(); break;
            case 'level': await Pages.levelDetail(parseInt(id)); break;
            case 'deepdive': await Pages.deepDiveLesson(parseInt(id), parseInt(id2)); break;
            case 'course': await Pages.courseDetail(id); break;
            case 'lesson': await Pages.lessonDetail(parseInt(id)); break;
            case 'challenge': await Pages.challengeDetail(parseInt(id)); break;
            case 'quiz': await Pages.quizDetail(parseInt(id)); break;
            case 'roadmap': await Pages.roadmap(); break;
            case 'leaderboard': await Pages.leaderboard(); break;
            case 'profile': await Pages.profile(); break;
            case 'settings': await Pages.settings(); break;
            case 'pricing': await Pages.pricing(); break;
            case 'projects':
                if (!id) { await Pages.projects(); break; }
                if (id === 'new') { await Pages.projectNew(); break; }
                await Pages.projectDetail(parseInt(id)); break;
            default: await Pages.dashboard(); break;
        }

        if (page !== 'login' && page !== 'register') {
            const profile = Auth.loadGuestProfile();
            if (Auth.isGuest() && (!profile.name || !profile.age)) {
                setTimeout(() => Components.onboardingOverlay(), 100);
            }
        }
    },
};

document.addEventListener('DOMContentLoaded', () => App.init());
