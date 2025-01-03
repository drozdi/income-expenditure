import httpService from './http.service';
const accountsEndpoint = 'accounts/';

const accountsService = {
	getAccounts: async () => {
		const { data } = await httpService.get(accountsEndpoint);
		return data;
	},
	getAccount: async (id) => {
		const { data } = await httpService.get(accountsEndpoint + id);
		return data;
	},
	addAccount: async (payload) => {
		const { data } = await httpService.post(accountsEndpoint, payload);
		return data;
	},
	updateAccount: async (id, payload) => {
		const { data } = await httpService.patch(accountsEndpoint + id, payload);
		return data;
	},
	deleteAccount: async (id) => {
		const { data } = await httpService.delete(accountsEndpoint + id);
		return data;
	},
	getTypes: async () => {
		const { data } = await httpService.get(accountsEndpoint + 'types');
		return data;
	},
};
export default accountsService;
