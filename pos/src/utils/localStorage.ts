export const isInLocalStorage = (key) => {
    console.log(localStorage.getItem(key))
    return localStorage.getItem(key)
}

export const getLocalStorageItem = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const setLocalStorageItem = (key, data) => {
    return localStorage.setItem(key, JSON.stringify(data))
}