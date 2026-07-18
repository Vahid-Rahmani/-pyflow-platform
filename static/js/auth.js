const Auth = {
    user: null,

    async loadUser() {
        if (API.isAuthenticated()) {
            const { ok, data } = await API.get('/auth/me/');
            if (ok) {
                this.user = data;
                return data;
            }
        }
        const guest = localStorage.getItem('guest_mode');
        if (guest === 'true') {
            const profile = this.loadGuestProfile();
            this.user = {
                username: profile.name || 'Guest',
                xp: parseInt(localStorage.getItem('guest_xp') || '0'),
                level: parseInt(localStorage.getItem('guest_level') || '1'),
                streak_count: parseInt(localStorage.getItem('guest_streak') || '0'),
                onboarding_complete: !!profile.name,
                name: profile.name || '',
                age: profile.age || '',
                goal: profile.goal || '',
            };
            return this.user;
        }
        const { ok, data } = await API.get('/auth/session-token/', false);
        if (ok) {
            API.setTokens(data.access, data.refresh);
            this.user = data.user;
            return data.user;
        }
        return null;
    },

    loadGuestProfile() {
        try {
            return JSON.parse(localStorage.getItem('guest_profile') || '{}');
        } catch { return {}; }
    },

    saveGuestProfile(profile) {
        localStorage.setItem('guest_profile', JSON.stringify(profile));
    },

    async login(username, password) {
        const { ok, data } = await API.post('/auth/login/', { username, password });
        if (ok) {
            API.setTokens(data.access, data.refresh);
            this.disableGuest();
            await this.loadUser();
            return { ok: true };
        }
        return { ok: false, error: data.detail || 'Login failed' };
    },

    async register(username, email, password, preferred_language = 'en') {
        const { ok, data } = await API.post('/auth/register/', {
            username, email, password, preferred_language,
        });
        if (ok) {
            API.setTokens(data.access, data.refresh);
            this.disableGuest();
            this.user = data.user;
            return { ok: true };
        }
        const msg = data?.username?.[0] || data?.email?.[0] || data?.password?.[0] || 'Registration failed';
        return { ok: false, error: msg };
    },

    enableGuest() {
        localStorage.setItem('guest_mode', 'true');
    },

    disableGuest() {
        localStorage.removeItem('guest_mode');
    },

    isGuest() {
        return localStorage.getItem('guest_mode') === 'true';
    },

    async logout() {
        API.clearTokens();
        this.disableGuest();
        this.user = null;
        App.navigate('login');
    },

    async changePassword(oldPassword, newPassword) {
        const { ok, data } = await API.post('/auth/change-password/', {
            old_password: oldPassword,
            new_password: newPassword,
        });
        return { ok, error: data?.detail || '' };
    },
};
