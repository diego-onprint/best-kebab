export const getLocalStorageItem = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const setLocalStorageItem = (key, data) => {
    return localStorage.setItem(key, JSON.stringify(data))
}