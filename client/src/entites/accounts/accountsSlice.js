import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountsService from '../../shared/services/accounts.service';

const initialState = {
	entities: [],
	isLoading: false,
	error: null,
};

export const fetchAccounts = createAsyncThunk(
	'accounts/fetchAccounts',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await accountsService.getAccounts();
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);
export const addAccount = createAsyncThunk(
	'accounts/addAccount',
	async (account, { rejectWithValue }) => {
		try {
			const { data } = await accountsService.addAccount(account);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);
export const updateAccount = createAsyncThunk(
	'accounts/updateAccount',
	async (account, { rejectWithValue }) => {
		try {
			const { data } = await accountsService.updateAccount(account._id, account);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);
export const deleteAccount = createAsyncThunk(
	'accounts/deleteAccount',
	async (id, { rejectWithValue }) => {
		try {
			await accountsService.deleteAccount(id);
			return id;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);
export const saveAccount = createAsyncThunk(
	'accounts/saveAccount',
	async (account, { dispatch }) => {
		if (account._id) {
			return await dispatch(updateAccount(account));
		} else {
			return await dispatch(addAccount(account));
		}
	},
);

export const addCategory = createAsyncThunk(
	'accounts/addCategory',
	async (category, { rejectWithValue }) => {
		try {
			const { data } = await accountsService.addCategory(
				category.account,
				category,
			);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);
export const updateCategory = createAsyncThunk(
	'accounts/updateCategory',
	async (category, { rejectWithValue }) => {
		try {
			const { data } = await accountsService.updateCategory(
				category.account,
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
	'accounts/deleteCategory',
	async ({ account, id }, { rejectWithValue }) => {
		try {
			await accountsService.deleteCategory(account, id);
			return { account, id };
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const saveCategory = createAsyncThunk(
	'accounts/saveCategory',
	async (category, { dispatch }) => {
		if (category._id) {
			return await dispatch(updateCategory(category));
		} else {
			return await dispatch(addCategory(category));
		}
	},
);

export const accountsSlice = createSlice({
	name: 'accounts',
	initialState,
	reducers: {
		reset: (state) => {
			state.entities = [];
			state.isLoading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAccounts.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchAccounts.fulfilled, (state, action) => {
			state.entities = action.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchAccounts.rejected, (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		});
		builder.addCase(addAccount.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(addAccount.fulfilled, (state, action) => {
			state.entities.push(action.payload);
			state.isLoading = false;
		});
		builder.addCase(addAccount.rejected, (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		});
		builder.addCase(updateAccount.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(updateAccount.fulfilled, (state, action) => {
			const index = state.entities.findIndex((t) => t._id === action.payload._id);
			if (index !== -1) {
				state.entities[index] = action.payload;
			}
			state.isLoading = false;
		});
		builder.addCase(updateAccount.rejected, (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		});
		builder.addCase(deleteAccount.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(deleteAccount.fulfilled, (state, action) => {
			state.entities = state.entities.filter((t) => t._id !== action.payload);
			state.isLoading = false;
		});
		builder.addCase(deleteAccount.rejected, (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		});

		builder.addCase(addCategory.pending, (state, action) => {
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
		});
	},
});

const { actions, reducer } = accountsSlice;
export const { reset: resetAccounts } = actions;

export const getAccounts = (state) => {
	return state.accounts.entities;
};
export const getAccount = (id) => (state) => {
	return state.accounts.entities.find((t) => t._id === id);
};
export const getLoading = (state) => {
	return state.accounts.isLoading;
};
export const getError = (state) => {
	return state.accounts.error;
};

export const getCategories = (accountId) => (state) => {
	return state.accounts.entities.find((t) => t._id === accountId)?.categories || [];
};
export const getCategory = (accountId, id) => (state) => {
	const categories =
		state.accounts.entities.find((t) => t._id === accountId)?.categories || [];
	return categories.find((t) => t._id === id);
};

export default reducer;
