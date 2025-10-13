import type { LocalStorageKey } from "../common/types";

const setLocalStorageItem = (key: LocalStorageKey, value: string) => {
	localStorage.setItem(key, value);
};

const getLocalStorageItem = (key: LocalStorageKey) => {
	localStorage.get(key);
};

const removeLocalStorageItem = (key: LocalStorageKey) => {
	localStorage.removeItem(key);
};

export { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem };
