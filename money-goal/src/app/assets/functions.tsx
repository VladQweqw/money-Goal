export function saveToLocal(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function retrieveFromLocal(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
}