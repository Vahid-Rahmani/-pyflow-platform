const App = {
    currentPage: null,

    async init() {
        // Auto-enable guest mode for first-time visitors
        if (!API.isAuthenticated() && !Auth.isGuest()) {
            Auth.enableGuest();
        }
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
        } else if (parts.length >= 3) {
            this.navigate(`${parts[0]}/${parts[1]}`);
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
        const canBrowse = this.canAccess();

        // Completely open access - login/register are optional
        // Only redirect logged-in users away from auth pages
        if (loggedIn && (page === 'login' || page === 'register')) {
            page = 'dashboard';
        }

        this.currentPage = page;
        const url = page === 'dashboard' ? '/' : `/${page}`;
        window.history.pushState({ page }, '', url);
        document.title = `LearnApp${page !== 'dashboard' ? ' - ' + page : ''}`;
        const parts = page.split('/');
        const base = parts[0];
        const id = parts[1];
        switch (base) {
            case 'login': await Pages.login(); break;
            case 'register': await Pages.register(); break;
            case 'roadmap': await Pages.roadmap(); break;
            case 'dashboard': await Pages.dashboard(); break;
            case 'course': await Pages.courseDetail(id); break;
            case 'lesson': await Pages.lessonDetail(parseInt(id)); break;
            case 'challenge': await Pages.challengeDetail(parseInt(id)); break;
            case 'quiz': await Pages.quizDetail(parseInt(id)); break;
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

        // Show onboarding overlay if guest hasn't completed it
        if (page !== 'login' && page !== 'register') {
            const profile = Auth.loadGuestProfile();
            if (Auth.isGuest() && (!profile.name || !profile.age)) {
                setTimeout(() => Components.onboardingOverlay(), 100);
            }
        }
    },
};

document.addEventListener('DOMContentLoaded', () => App.init());
