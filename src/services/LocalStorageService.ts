class LocalStorageService {
    static getItem<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item) as T;
        }
        return null;
    }

    static setItem<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    static clear(): void {
        localStorage.clear();
    }
}

export default LocalStorageService;
