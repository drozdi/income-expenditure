import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoriesService from '../../shared/services/categories.service';

const initialState = {
	entities: {},
	types: {},
	isLoading: false,
	error: null,
};

export const fetchCategories = createAsyncThunk(
	'categories/fetch',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await categoriesService.getCategories();
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);
export const fetchTypes = createAsyncThunk(
	'categories/fetchTypes',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await categoriesService.getTypes();
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const addCategory = createAsyncThunk(
	'categories/add',
	async (category, { rejectWithValue }) => {
		try {
			const { data } = await categoriesService.addCategory(category);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);
export const updateCategory = createAsyncThunk(
	'categories/update',
	async (category, { rejectWithValue }) => {
		try {
			const { data } = await categoriesService.updateCategory(
				category._id,
				category,
			);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const deleteCategory = createAsyncThunk(
	'categories/delete',
	async (id, { rejectWithValue }) => {
		try {
			const { data } = await categoriesService.deleteCategory(id);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const saveCategory = createAsyncThunk(
	'categories/save',
	async (category, { dispatch }) => {
		if (category._id) {
			return await dispatch(updateCategory(category));
		} else {
			return await dispatch(addCategory(category));
		}
	},
);

export const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		reset: (state) => {
			state.entities = {};
			state.isLoading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCategories.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
			state.entities = payload;
			state.isLoading = false;
		});
		builder.addCase(fetchCategories.rejected, (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		});

		builder.addCase(fetchTypes.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchTypes.fulfilled, (state, { payload }) => {
			state.types = payload;
			state.isLoading = false;
		});
		builder.addCase(fetchTypes.rejected, (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		});

		builder.addCase(addCategory.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(addCategory.fulfilled, (state, { payload }) => {
			state.entities[payload.account].push(payload);
			state.isLoading = false;
		});
		builder.addCase(addCategory.rejected, (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		});

		builder.addCase(updateCategory.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(updateCategory.fulfilled, (state, { payload }) => {
			const index = state.entities[payload.account].findIndex(
				(t) => t._id === payload._id,
			);
			state.entities[payload.account][index] = payload;
			state.isLoading = false;
		});
		builder.addCase(updateCategory.rejected, (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		});

		builder.addCase(deleteCategory.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
			state.entities[payload.account] = state.entities[payload.account].filter(
				(t) => t._id !== payload._id,
			);
			state.isLoading = false;
		});
		builder.addCase(deleteCategory.rejected, (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		}); //*/
	},
});

const { actions, reducer } = categoriesSlice;
export const { reset: resetCategories } = actions;

export const getLoading = (state) => {
	return state.categories.isLoading;
};
export const getError = (state) => {
	return state.categories.error;
};

export const getCategories = (accountId) => (state) => {
	return state.categories.entities[accountId];
};

export const getTypes = (state) => {
	return state.categories.types;
};

export default reducer;
