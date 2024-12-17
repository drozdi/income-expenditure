import httpService from './http.service';
const categoriesEndpoint = 'categories/';

const categoriesService = {
	getCategories: async () => {
		const { data } = await httpService.get(categoriesEndpoint);
		return data;
	},
	getCategory: async (id) => {
		const { data } = await httpService.get(categoriesEndpoint + id);
		return data;
	},
	addCategory: async (payload) => {
		const { data } = await httpService.post(categoriesEndpoint, payload);
		return data;
	},
	updateCategory: async (id, payload) => {
		const { data } = await httpService.patch(categoriesEndpoint + id, payload);
		return data;
	},
	deleteCategory: async (id) => {
		const { data } = await httpService.delete(categoriesEndpoint + id);
		return data;
	},
};
export default categoriesService;
