import type { localStorageState } from "../constants";

type LocalStorageKey =
	(typeof localStorageState)[keyof typeof localStorageState];

export type { LocalStorageKey };
