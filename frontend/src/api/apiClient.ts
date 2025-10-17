import axios from "axios";
import { ApiPath } from "../common/enums";

const api = axios.create({
	baseURL: ApiPath,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const apiClient = {
	get: <T>(url: string, config = {}) =>
		api.get<T>(url, config).then((res) => res.data),
	post: <T>(url: string, data?: any, config = {}) =>
		api.post<T>(url, data, config).then((res) => res.data),
	put: <T>(url: string, data?: any, config = {}) =>
		api.put<T>(url, data, config).then((res) => res.data),
	delete: <T>(url: string, config = {}) =>
		api.delete<T>(url, config).then((res) => res.data),
};
