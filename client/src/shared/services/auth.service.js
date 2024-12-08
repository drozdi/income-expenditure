import axios from 'axios';
import localStorageService from './localStorage.service';

const httpAuth = axios.create({
	baseURL: 'http://localhost:8080/api/auth/',
});

const authService = {
	register: async (payload) => {
		const { data } = await httpAuth.post(`signUp`, payload);
		return data;
	},
	login: async ({ email, password }) => {
		const { data } = await httpAuth.post(`signIn`, {
			email,
			password,
		});
		return data;
	},
	refresh: async () => {
		const { data } = await httpAuth.post('token', {
			refresh_token: localStorageService.getRefreshToken(),
		});
		return data;
	},
	logout: async () => {
		localStorageService.removeAuthData();
	},
};
export default authService;
