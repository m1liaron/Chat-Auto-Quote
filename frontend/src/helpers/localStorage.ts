import type { LocalStorageKey } from "../common/types";

const setLocalStorageItem = (key: LocalStorageKey, value: string) => {
	localStorage.setItem(key, value);
};

const getLocalStorageItem = (key: LocalStorageKey) => {
	const value = localStorage.getItem(key);
	return value;
};

const removeLocalStorageItem = (key: LocalStorageKey) => {
	localStorage.removeItem(key);
};

export { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem };
