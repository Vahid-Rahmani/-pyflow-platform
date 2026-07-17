const API = {
    BASE: '/api',

    getTokens() {
        return {
            access: localStorage.getItem('access_token'),
            refresh: localStorage.getItem('refresh_token'),
        };
    },

    async request(method, path, data = null, auth = true) {
        const url = this.BASE + path;
        const headers = { 'Content-Type': 'application/json' };
        if (auth) {
            const { access } = this.getTokens();
            if (access) headers['Authorization'] = `Bearer ${access}`;
        }
        const opts = { method, headers };
        if (data) opts.body = JSON.stringify(data);
        const res = await fetch(url, opts);
        if (res.status === 401 && auth) {
            const refreshed = await this.refreshToken();
            if (refreshed) return this.request(method, path, data, auth);
        }
        const json = await res.json();
        return { ok: res.ok, status: res.status, data: json };
    },

    async get(path) { return this.request('GET', path); },
    async post(path, data) { return this.request('POST', path, data); },
    async put(path, data) { return this.request('PUT', path, data); },
    async patch(path, data) { return this.request('PATCH', path, data); },
    async del(path) { return this.request('DELETE', path); },

    async refreshToken() {
        const { refresh } = this.getTokens();
        if (!refresh) return false;
        try {
            const res = await fetch(this.BASE + '/auth/refresh/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh }),
            });
            const json = await res.json();
            if (res.ok && json.access) {
                localStorage.setItem('access_token', json.access);
                return true;
            }
        } catch (e) {}
        return false;
    },

    setTokens(access, refresh) {
        localStorage.setItem('access_token', access);
        if (refresh) localStorage.setItem('refresh_token', refresh);
    },

    clearTokens() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },

    isAuthenticated() {
        return !!localStorage.getItem('access_token');
    },
};
