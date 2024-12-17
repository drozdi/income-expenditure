import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoriesService from '../../shared/services/categories.service';

const initialState = {
	entities: {},
	isLoading: false,
	error: null,
};

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await categoriesService.getCategories();
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const addCategory = createAsyncThunk(
	'categories/addCategory',
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
	'categories/updateCategory',
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
	'categories/deleteCategory',
	async (id, { rejectWithValue }) => {
		try {
			await categoriesService.deleteCategory(id);
			return id;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const saveCategory = createAsyncThunk(
	'categories/saveCategory',
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
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.entities = action.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchCategories.rejected, (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		});

		/*builder.addCase(addCategory.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(addCategory.fulfilled, (state, action) => {
			state.entities
				.find((t) => t._id === action.payload.account)
				.categories.push(action.payload);
			state.isLoading = false;
		});
		builder.addCase(addCategory.rejected, (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		});

		builder.addCase(updateCategory.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(updateCategory.fulfilled, (state, action) => {
			const accountIndex = state.entities.findIndex(
				(t) => t._id === action.payload.account,
			);
			const index = state.entities[accountIndex].categories.findIndex(
				(t) => t._id === action.payload._id,
			);
			state.entities[accountIndex].categories[index] = action.payload;
			state.isLoading = false;
		});
		builder.addCase(updateCategory.rejected, (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		});

		builder.addCase(deleteCategory.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(deleteCategory.fulfilled, (state, action) => {
			const accountIndex = state.entities.findIndex(
				(t) => t._id === action.payload.account,
			);
			state.entities[accountIndex].categories = state.entities[
				accountIndex
			].categories.filter((t) => t._id !== action.payload.id);
			state.isLoading = false;
		});
		builder.addCase(deleteCategory.rejected, (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		});*/
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
	return state.categories.entities[accountId] ?? [];
};
export const getCategory = (accountId, id) => (state) => {
	const categories = state.categories.entities[accountId] ?? [];
	return categories?.find((t) => t._id === id) || {};
};

export default reducer;
