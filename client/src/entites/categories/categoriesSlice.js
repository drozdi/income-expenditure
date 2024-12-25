import categoriesService from '../../shared/services/categories.service';
import { createSlice } from '../utils/createSlice';

const initialState = {
	entities: {},
	types: {},
	editId: null,
	loading: false,
	error: null,
};

export const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: (create) => ({
		reset: create.reducer(() => initialState),
		edit: create.reducer((state, { payload }) => {
			state.editId = payload;
		}),
		fetchCategories: create.asyncThunk(
			async (payload, { rejectWithValue }) => {
				try {
					const { data } = await categoriesService.getCategories();
					return data;
				} catch (error) {
					return rejectWithValue(error.response.data);
				}
			},
			{
				pending: (state) => {
					state.loading = true;
				},
				fulfilled: (state, { payload }) => {
					state.entities = payload;
					state.loading = false;
				},
				rejected: (state, { payload, error }) => {
					state.error = payload ?? error;
					state.loading = false;
				},
			},
		),
		fetchTypes: create.asyncThunk(
			async (payload, { rejectWithValue }) => {
				try {
					const { data } = await categoriesService.getTypes();
					return data;
				} catch (error) {
					return rejectWithValue(error.response.data);
				}
			},
			{
				pending: (state) => {
					state.loading = true;
				},
				fulfilled: (state, { payload }) => {
					state.types = payload;
					state.loading = false;
				},
				rejected: (state, { payload, error }) => {
					state.error = payload ?? error;
					state.loading = false;
				},
			},
		),
		addCategory: create.asyncThunk(
			async (payload, { rejectWithValue }) => {
				try {
					const { data } = await categoriesService.addCategory(payload);
					return data;
				} catch (error) {
					return rejectWithValue(error.response.data);
				}
			},
			{
				pending: (state) => {
					state.loading = true;
				},
				fulfilled: (state, { payload }) => {
					state.entities[payload.account].push(payload);
					state.loading = false;
				},
				rejected: (state, { payload, error }) => {
					state.error = payload ?? error;
					state.loading = false;
				},
			},
		),
		updateCategory: create.asyncThunk(
			async (payload, { rejectWithValue }) => {
				try {
					const { data } = await categoriesService.updateCategory(
						payload._id,
						payload,
					);
					return data;
				} catch (error) {
					return rejectWithValue(error.response.data);
				}
			},
			{
				pending: (state) => {
					state.loading = true;
				},
				fulfilled: (state, { payload }) => {
					const index = state.entities[payload.account].findIndex(
						(t) => t._id === payload._id,
					);
					state.editId = null;
					state.entities[payload.account][index] = payload;
					state.loading = false;
				},
				rejected: (state, { payload, error }) => {
					state.error = payload ?? error;
					state.loading = false;
				},
			},
		),
		deleteCategory: create.asyncThunk(
			async (payload, { rejectWithValue }) => {
				try {
					const { data } = await categoriesService.deleteCategory(payload);
					return data;
				} catch (error) {
					return rejectWithValue(error.response.data);
				}
			},
			{
				pending: (state) => {
					state.loading = true;
				},
				fulfilled: (state, { payload }) => {
					state.entities[payload.account] = state.entities[
						payload.account
					].filter((t) => t._id !== payload._id);
					state.loading = false;
				},
				rejected: (state, { payload, error }) => {
					state.error = payload ?? error;
					state.loading = false;
				},
			},
		),
		saveCategory: create.asyncThunk(async (payload, { dispatch }) => {
			if (payload._id) {
				return await dispatch(categoriesSlice.actions.updateCategory(payload));
			} else {
				return await dispatch(categoriesSlice.actions.addCategory(payload));
			}
		}),
	}),
	selectors: {
		selectError: (state) => state.error,
		selectLoading: (state) => state.loading,
		selectEditId: (state) => state.editId,
		selectTypes: (state) => state.types,
	},
});

const { actions, selectors, reducer } = categoriesSlice;
export const {
	reset: resetCategories,
	edit: editCategory,
	fetchCategories,
	fetchTypes,
	addCategory,
	updateCategory,
	deleteCategory,
} = actions;

export const { selectError, selectLoading, selectEditId, selectTypes } = selectors;

export const selectCategories = (accountId) => (state) => {
	return state.categories.entities[accountId];
};

export default reducer;
