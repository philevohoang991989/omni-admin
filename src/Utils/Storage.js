const $localStorage = localStorage;
const $sessionStorage = sessionStorage;
const $storages = {
    local: $localStorage,
    session: $sessionStorage
};
const $storage = $storages.local;

delete window.localStorage;
delete window.sessionStorage;

class Storage {

    set(key, value) {
        $storage.setItem(key, JSON.stringify(value));
    }

    get(key) {
        const value = $storage.getItem(key);
        if (value && value !== 'undefined')
            return JSON.parse(value);
    }

    remove(key) {
        return $storage.removeItem(key);
    }

    clear() {
        return $storage.clear();
    }

    getIdentity() {
        return this.get('_IDENTITY_') || {}
    }

    setIdentity(identity) {
        this.set('_IDENTITY_', identity || {});
    }

    setAccessToken(accessToken) {
        this.set('_ACCESS_TOKEN_', accessToken);
    }

    getAccessToken() {
        return this.get('_ACCESS_TOKEN_');
    }
}

const storage = new Storage();

export default storage;