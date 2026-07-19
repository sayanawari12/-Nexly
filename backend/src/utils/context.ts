import { AsyncLocalStorage } from 'async_hooks';
import { RequestStore } from '../types';

export const contextStore = new AsyncLocalStorage<RequestStore>();

export const RequestContext = {
  /**
   * Retrieves the current request store map.
   */
  getStore(): RequestStore | undefined {
    return contextStore.getStore();
  },

  /**
   * Gets a specific key from the request context store.
   */
  get(key: string): any {
    const store = this.getStore();
    return store ? store[key] : undefined;
  },

  /**
   * Sets a specific key inside the request context store.
   */
  set(key: string, value: any): void {
    const store = this.getStore();
    if (store) {
      store[key] = value;
    }
  },

  /**
   * Retrieves the active X-Correlation-ID request tracking ID.
   */
  getRequestId(): string | undefined {
    return this.get('requestId');
  },
};
