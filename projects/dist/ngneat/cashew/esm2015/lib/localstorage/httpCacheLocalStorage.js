import { HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { deleteByRegex } from '../deleteByRegex';
import { DefaultHttpCacheStorage } from '../httpCacheStorage';
import { HTTP_CACHE_CONFIG } from '../httpCacheConfig';
import { setCacheInStorage, getStorageCache, clearStorageCache } from './localstorage';
export class HttpCacheLocalStorage {
    constructor(config) {
        this.config = config;
        this.cache = new DefaultHttpCacheStorage();
        this.storageKey = config.localStorageKey;
    }
    has(key) {
        return this.cache.has(key) || getStorageCache(this.storageKey).has(key);
    }
    get(key) {
        const cacheValue = this.cache.get(key);
        if (cacheValue) {
            return cacheValue;
        }
        const value = getStorageCache(this.storageKey).get(key);
        if (value) {
            const response = new HttpResponse(value);
            this.cache.set(key, response);
        }
        return this.cache.get(key);
    }
    set(key, response) {
        const storage = getStorageCache(this.storageKey);
        storage.set(key, response);
        setCacheInStorage(this.storageKey, storage);
        this.cache.set(key, response);
    }
    delete(key) {
        this.cache.delete(key);
        if (!key) {
            clearStorageCache(this.storageKey);
            return;
        }
        const storage = getStorageCache(this.storageKey);
        if (typeof key === 'string') {
            storage.delete(key);
            setCacheInStorage(this.storageKey, storage);
            return;
        }
        deleteByRegex(key, storage);
        setCacheInStorage(this.storageKey, storage);
    }
}
HttpCacheLocalStorage.decorators = [
    { type: Injectable }
];
HttpCacheLocalStorage.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [HTTP_CACHE_CONFIG,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cENhY2hlTG9jYWxTdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbmduZWF0L2Nhc2hldy9zcmMvbGliL2xvY2Fsc3RvcmFnZS9odHRwQ2FjaGVMb2NhbFN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQW9CLE1BQU0scUJBQXFCLENBQUM7QUFDaEYsT0FBTyxFQUFFLGlCQUFpQixFQUFtQixNQUFNLG9CQUFvQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd2RixNQUFNLE9BQU8scUJBQXFCO0lBSWhDLFlBQStDLE1BQXVCO1FBQXZCLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBSHJELFVBQUssR0FBRyxJQUFJLHVCQUF1QixFQUFFLENBQUM7UUFJckQsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQzNDLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFXO1FBQ2IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdkMsSUFBSSxVQUFVLEVBQUU7WUFDZCxPQUFPLFVBQVUsQ0FBQztTQUNuQjtRQUVELE1BQU0sS0FBSyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXhELElBQUksS0FBSyxFQUFFO1lBQ1QsTUFBTSxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQy9CO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQVcsRUFBRSxRQUEyQjtRQUMxQyxNQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBcUI7UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdkIsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxPQUFPO1NBQ1I7UUFFRCxNQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWpELElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEIsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUU1QyxPQUFPO1NBQ1I7UUFFRCxhQUFhLENBQUMsR0FBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7O1lBeERGLFVBQVU7Ozs0Q0FLSSxNQUFNLFNBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkZWxldGVCeVJlZ2V4IH0gZnJvbSAnLi4vZGVsZXRlQnlSZWdleCc7XG5pbXBvcnQgeyBEZWZhdWx0SHR0cENhY2hlU3RvcmFnZSwgSHR0cENhY2hlU3RvcmFnZSB9IGZyb20gJy4uL2h0dHBDYWNoZVN0b3JhZ2UnO1xuaW1wb3J0IHsgSFRUUF9DQUNIRV9DT05GSUcsIEh0dHBDYWNoZUNvbmZpZyB9IGZyb20gJy4uL2h0dHBDYWNoZUNvbmZpZyc7XG5pbXBvcnQgeyBzZXRDYWNoZUluU3RvcmFnZSwgZ2V0U3RvcmFnZUNhY2hlLCBjbGVhclN0b3JhZ2VDYWNoZSB9IGZyb20gJy4vbG9jYWxzdG9yYWdlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHBDYWNoZUxvY2FsU3RvcmFnZSBpbXBsZW1lbnRzIEh0dHBDYWNoZVN0b3JhZ2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IGNhY2hlID0gbmV3IERlZmF1bHRIdHRwQ2FjaGVTdG9yYWdlKCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RvcmFnZUtleTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoSFRUUF9DQUNIRV9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBIdHRwQ2FjaGVDb25maWcpIHtcbiAgICB0aGlzLnN0b3JhZ2VLZXkgPSBjb25maWcubG9jYWxTdG9yYWdlS2V5O1xuICB9XG5cbiAgaGFzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUuaGFzKGtleSkgfHwgZ2V0U3RvcmFnZUNhY2hlKHRoaXMuc3RvcmFnZUtleSkuaGFzKGtleSk7XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcpOiBIdHRwUmVzcG9uc2U8YW55PiB7XG4gICAgY29uc3QgY2FjaGVWYWx1ZSA9IHRoaXMuY2FjaGUuZ2V0KGtleSk7XG5cbiAgICBpZiAoY2FjaGVWYWx1ZSkge1xuICAgICAgcmV0dXJuIGNhY2hlVmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBnZXRTdG9yYWdlQ2FjaGUodGhpcy5zdG9yYWdlS2V5KS5nZXQoa2V5KTtcblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgSHR0cFJlc3BvbnNlKHZhbHVlKTtcbiAgICAgIHRoaXMuY2FjaGUuc2V0KGtleSwgcmVzcG9uc2UpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNhY2hlLmdldChrZXkpO1xuICB9XG5cbiAgc2V0KGtleTogc3RyaW5nLCByZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiB2b2lkIHtcbiAgICBjb25zdCBzdG9yYWdlID0gZ2V0U3RvcmFnZUNhY2hlKHRoaXMuc3RvcmFnZUtleSk7XG4gICAgc3RvcmFnZS5zZXQoa2V5LCByZXNwb25zZSk7XG4gICAgc2V0Q2FjaGVJblN0b3JhZ2UodGhpcy5zdG9yYWdlS2V5LCBzdG9yYWdlKTtcbiAgICB0aGlzLmNhY2hlLnNldChrZXksIHJlc3BvbnNlKTtcbiAgfVxuXG4gIGRlbGV0ZShrZXk/OiBzdHJpbmcgfCBSZWdFeHApOiB2b2lkIHtcbiAgICB0aGlzLmNhY2hlLmRlbGV0ZShrZXkpO1xuXG4gICAgaWYgKCFrZXkpIHtcbiAgICAgIGNsZWFyU3RvcmFnZUNhY2hlKHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3RvcmFnZSA9IGdldFN0b3JhZ2VDYWNoZSh0aGlzLnN0b3JhZ2VLZXkpO1xuXG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBzdG9yYWdlLmRlbGV0ZShrZXkpO1xuICAgICAgc2V0Q2FjaGVJblN0b3JhZ2UodGhpcy5zdG9yYWdlS2V5LCBzdG9yYWdlKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRlbGV0ZUJ5UmVnZXgoa2V5IGFzIFJlZ0V4cCwgc3RvcmFnZSk7XG4gICAgc2V0Q2FjaGVJblN0b3JhZ2UodGhpcy5zdG9yYWdlS2V5LCBzdG9yYWdlKTtcbiAgfVxufVxuIl19