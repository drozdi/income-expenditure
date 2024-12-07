import axios from 'axios';
import { toast } from 'react-toastify';
import authService from './auth.service';

import localStorageService from './localStorage.service';

const http = axios.create({
	baseURL: 'http://localhost:8080/api/',
});

http.interceptors.request.use(
	async function (config) {
		const expiresDate = localStorageService.getTokenExpiresDate();
		const refreshToken = localStorageService.getRefreshToken();
		const isExpired = refreshToken && expiresDate < Date.now();

		if (isExpired) {
			const data = await authService.refresh();
			localStorageService.setTokens(data);
		}
		const accessToken = localStorageService.getAccessToken();
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

http.interceptors.response.use(
	(response) => response,
	async (error) => {
		//??????
		/*try {
			if (error.response.status === 403) {
				const data = await authService.refresh();
				localStorageService.setTokens(data);
				return api.request(error.config);
			}
		} catch (error) {}*/

		const expectedErrors =
			error.response && error.response.status >= 400 && error.response.status < 500;

		if (!expectedErrors) {
			console.log(error);
			toast.error('Somthing was wrong. Try it later');
		}
		return Promise.reject(error);
	},
);
const httpService = {
	get: http.get,
	post: http.post,
	put: http.put,
	delete: http.delete,
	patch: http.patch,
};
export default httpService;
