import httpService from './http.service';
const settingsEndpoint = 'settings/';

const settingsService = {
	getSettings: async () => {
		const { data } = await httpService.get(settingsEndpoint);
		return data;
	},
	getUser: async () => {
		const { data } = await httpService.get(settingsEndpoint + 'user');
		return data;
	},
	updateUser: async (payload) => {
		const { data } = await httpService.patch(settingsEndpoint + 'user', payload);
		return data;
	},
	getUsers: async () => {
		const { data } = await httpService.get(settingsEndpoint + 'users');
		return data;
	},
	updateUsers: async (payload) => {
		const { data } = await httpService.patch(settingsEndpoint + 'users', payload);
		return data;
	},
};
export default settingsService;
