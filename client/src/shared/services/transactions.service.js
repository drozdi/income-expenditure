import httpService from './http.service';
const transactionsEndpoint = 'transactions/';

const transactionsService = {
	getTransactions: async () => {
		const { data } = await httpService.get(transactionsEndpoint);
		return data;
	},
	getTransaction: async (id) => {
		const { data } = await httpService.get(transactionsEndpoint + id);
		return data;
	},
	addTransaction: async (payload) => {
		const { data } = await httpService.post(transactionsEndpoint, payload);
		return data;
	},
	updateTransaction: async (id, payload) => {
		const { data } = await httpService.patch(transactionsEndpoint + id, payload);
		return data;
	},
	deleteTransaction: async (id) => {
		const { data } = await httpService.delete(transactionsEndpoint + id);
		return data;
	},
};
export default transactionsService;
