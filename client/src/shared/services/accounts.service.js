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

	addCategory: async (account, payload) => {
		const { data } = await httpService.post(
			accountsEndpoint + account + '/categories/',
			payload,
		);
		return data;
	},
	updateCategory: async (account, id, payload) => {
		const { data } = await httpService.patch(
			accountsEndpoint + account + '/categories/' + id,
			payload,
		);
		return data;
	},
	deleteCategory: async (account, id) => {
		const { data } = await httpService.delete(
			accountsEndpoint + account + '/categories/' + id,
		);
		return data;
	},
};
export default accountsService;
