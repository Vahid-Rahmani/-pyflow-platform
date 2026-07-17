const Auth = {
    user: null,

    async loadUser() {
        if (!API.isAuthenticated()) return null;
        const { ok, data } = await API.get('/auth/me/');
        if (ok) {
            this.user = data;
            return data;
        }
        return null;
    },

    async login(username, password) {
        const { ok, data } = await API.post('/auth/login/', { username, password });
        if (ok) {
            API.setTokens(data.access, data.refresh);
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
            this.user = data.user;
            return { ok: true };
        }
        const msg = data?.username?.[0] || data?.email?.[0] || data?.password?.[0] || 'Registration failed';
        return { ok: false, error: msg };
    },

    async logout() {
        API.clearTokens();
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
