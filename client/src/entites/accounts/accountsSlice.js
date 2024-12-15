import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountsService from '../../shared/services/accounts.service';

const initialState = {
	entities: [],
	current: {
		label: '',
		balance: 0,
		owner: {},
	},
	isLoading: false,
	error: null,
};

export const fetchAccounts = createAsyncThunk(
	'accounts/fetchAccounts',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await accountsService.getSources();
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);
export const addAccount = createAsyncThunk('accounts/addAccount', async (account) => {
	try {
		const { data } = await accountsService.addAccount(account);
		return data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

export const sourceSlice = createSlice({
	name: 'accounts',
	initialState,
	reducers: {
		reset: (state) => {
			state.entities = [];
			state.current = {};
			state.isLoading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAccounts.pending, (state, actions) => {
			state.isLoading = true;
		});
		builder.addCase(fetchAccounts.fulfilled, (state, actions) => {
			state.entities = actions.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchAccounts.rejected, (state, actions) => {
			state.error = actions.payload;
			state.isLoading = false;
		});

		builder.addCase(addAccount.pending, (state, actions) => {
			state.isLoading = true;
		});
		builder.addCase(addAccount.fulfilled, (state, action) => {
			state.current = action.payload;
			state.entities.push(action.payload);
			state.isLoading = false;
		});
		builder.addCase(addAccount.rejected, (state, action) => {
			state.error = actions.payload;
			state.isLoading = false;
		});
	},
});

const { actions, reducer } = sourceSlice;
export const {} = actions;

export const getAccounts = (state) => {
	return state.accounts.entities;
};
export const getLoading = (state) => {
	return state.accounts.isLoading;
};

export default reducer;
