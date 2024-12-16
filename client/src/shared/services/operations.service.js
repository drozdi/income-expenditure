import httpService from './http.service';
const operationsEndpoint = 'operations/';

const operationsService = {
	getOperations: async () => {
		const { data } = await httpService.get(operationsEndpoint);
		return data;
	},
};
export default operationsService;
