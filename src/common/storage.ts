export const storage = {
    set: (key: string, value: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('localStorage 存满了', e)
        }
    },
    get: (key: string) => {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : null;
    },
}