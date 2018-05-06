const sessionStorage = {
    set: function (key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    get: function (key) {
        return JSON.parse(window.sessionStorage.getItem(key));
    }
};

export default sessionStorage;
