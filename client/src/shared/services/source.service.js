import httpService from './http.service';
const sourceEndpoint = 'source/';

const sourceService = {
	getSources: async () => {
		const { data } = await httpService.get(sourceEndpoint);
		return data;
	},
	getSource: async (sourceId) => {
		const { data } = await httpService.get(sourceEndpoint + sourceId);
		return data;
	},
	addSource: async (payload) => {
		const { data } = await httpService.post(sourceEndpoint, payload);
		return data;
	},
	updateSource: async (sourceId, payload) => {
		const { data } = await httpService.patch(sourceEndpoint + sourceId, payload);
		return data;
	},
	deleteSource: async (sourceId) => {
		const { data } = await httpService.delete(sourceEndpoint + sourceId);
		return data;
	},
};
export default sourceService;
