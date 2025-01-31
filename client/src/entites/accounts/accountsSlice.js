import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountsService from '../../shared/services/accounts.service';

const initialState = {
	entities: [],
	types: [],
	isLoading: false,
	error: null,
};

export const fetchAccounts = createAsyncThunk(
	'accounts/fetch',
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
	'accounts/add',
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
	'accounts/update',
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
	'accounts/delete',
	async (id, { rejectWithValue }) => {
		try {
			const { data } = await accountsService.deleteAccount(id);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);
export const saveAccount = createAsyncThunk(
	'accounts/save',
	async (account, { dispatch }) => {
		if (account._id) {
			return await dispatch(updateAccount(account));
		} else {
			return await dispatch(addAccount(account));
		}
	},
);
export const fetchTypes = createAsyncThunk(
	'accounts/types',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await accountsService.getTypes();
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);
export const accountsSlice = createSlice({
	name: 'accounts',
	initialState,
	reducers: {
		reset: (state) => {
			state.entities = [];
			state.types = [];
			state.isLoading = false;
			state.error = null;
		},
		accountBalance: (state, { payload }) => {
			const index = state.entities.findIndex((t) => t._id === payload.account);
			if (index !== -1 && payload.accountBalance) {
				state.entities[index].balance = payload.accountBalance;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTypes.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchTypes.fulfilled, (state, { payload }) => {
			state.types = payload;
			state.isLoading = false;
		});
		builder.addCase(fetchTypes.rejected, (state, { payload, error }) => {
			state.error = payload ?? error;
			state.isLoading = false;
		});

		builder.addCase(fetchAccounts.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchAccounts.fulfilled, (state, { payload }) => {
			state.entities = payload;
			state.isLoading = false;
		});
		builder.addCase(fetchAccounts.rejected, (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		});

		builder.addCase(addAccount.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(addAccount.fulfilled, (state, { payload }) => {
			state.entities.push(payload);
			state.isLoading = false;
		});
		builder.addCase(addAccount.rejected, (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		});

		builder.addCase(updateAccount.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(updateAccount.fulfilled, (state, { payload }) => {
			const index = state.entities.findIndex((t) => t._id === payload._id);
			if (index !== -1) {
				state.entities[index] = payload;
			}
			state.isLoading = false;
		});
		builder.addCase(updateAccount.rejected, (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		});

		builder.addCase(deleteAccount.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(deleteAccount.fulfilled, (state, { payload }) => {
			state.entities = state.entities.filter((t) => t._id !== payload._id);
			state.isLoading = false;
		});
		builder.addCase(deleteAccount.rejected, (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		});
	},
	selectors: {
		selectTypes: (state) => state.types,
		selectAccounts: (state) => state.entities,
		selectLoading: (state) => state.isLoading,
		selectError: (state) => state.error,
		selectTotalBalance: (state) =>
			state.entities.reduce((acc, cur) => acc + cur.balance, 0),
	},
});

const { actions, selectors, reducer } = accountsSlice;
export const { reset: resetAccounts, accountBalance } = actions;

export const {
	selectTypes,
	selectAccounts,
	selectLoading,
	selectError,
	selectTotalBalance,
} = selectors;

export const selectAccount = (id) => (state) => {
	return state.accounts.entities.find((t) => t._id === id);
};
export const selectAccountLabel = (id) => (state) => {
	return state.accounts.entities.find((t) => t._id === id)?.label || id;
};

export default reducer;
