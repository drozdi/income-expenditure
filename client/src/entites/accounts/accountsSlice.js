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
			console.log(account._id, account);
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
