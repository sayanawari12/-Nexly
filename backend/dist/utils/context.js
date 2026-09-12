"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContext = exports.contextStore = void 0;
const async_hooks_1 = require("async_hooks");
exports.contextStore = new async_hooks_1.AsyncLocalStorage();
exports.RequestContext = {
    /**
     * Retrieves the current request store map.
     */
    getStore() {
        return exports.contextStore.getStore();
    },
    /**
     * Gets a specific key from the request context store.
     */
    get(key) {
        const store = this.getStore();
        return store ? store[key] : undefined;
    },
    /**
     * Sets a specific key inside the request context store.
     */
    set(key, value) {
        const store = this.getStore();
        if (store) {
            store[key] = value;
        }
    },
    /**
     * Retrieves the active X-Correlation-ID request tracking ID.
     */
    getRequestId() {
        return this.get('requestId');
    },
};
