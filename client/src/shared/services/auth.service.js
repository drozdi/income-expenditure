import axios from 'axios';
import localStorageService from './localStorage.service';

const httpAuth = axios.create({
	baseURL: '/api/auth/',
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
	logout: async () => {
		const { data } = await httpAuth.post('signOut');
		localStorageService.removeAuthData();
		return data;
	},
};
export default authService;
