import transactionsService from '../../shared/services/transactions.service';
import { createSlice } from '../utils/createSlice';

const initialState = {
	entities: [],
	loading: false,
	error: null,
	limitItems: 10,
	totalPages: 1,
	currentPage: 1,
};

export const transactionsSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: (create) => ({
		reset: () => initialState,
		setTransactions: (state, { payload }) => {
			state.entities = payload;
		},
		fetchTransactions: create.asyncThunk(
			async (payload, { rejectWithValue }) => {
				try {
					const { data } = await transactionsService.getTransactions();
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
		deleteTransation: create.asyncThunk(
			async (payload, { rejectWithValue }) => {
				try {
					const { data } = await transactionsService.deleteTransaction(payload);
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
					const p = [].concat(payload).map((t) => t._id);
					state.entities = state.entities.filter((t) => !p.includes(t._id));
					state.loading = false;
				},
				rejected: (state, { payload, error }) => {
					state.error = payload ?? error;
					state.loading = false;
				},
			},
		),

		saveTransaction: create.asyncThunk(async (payload, { dispatch }) => {
			if (payload._id) {
				return await dispatch(
					transactionsSlice.actions.updateTransation(payload),
				);
			} else {
				return await dispatch(transactionsSlice.actions.addTransaction(payload));
			}
		}),
		addTransaction: create.asyncThunk(
			async (payload, { rejectWithValue }) => {
				try {
					const { data } = await transactionsService.addTransaction(payload);
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
					state.entities.concat(payload);
					state.loading = false;
				},
				rejected: (state, { payload, error }) => {
					state.error = payload ?? error;
					state.loading = false;
				},
			},
		),
		updateTransation: create.asyncThunk(
			async (payload, { rejectWithValue }) => {
				try {
					const { data } = await transactionsService.updateTransaction(
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
					const transactions = [].concat(payload);
					for (const transaction of transactions) {
						if (transaction.removed) {
							state.entities = state.entities.filter(
								(t) => t._id !== transaction._id,
							);
						} else if (transaction.added) {
							state.entities.push(transaction);
						} else {
							const index = state.entities.findIndex(
								(t) => t._id === transaction._id,
							);
							if (index >= 0) {
								state.entities[index] = { ...transaction };
							}
						}
					}
					state.loading = false;
				},
				rejected: (state, { payload, error }) => {
					state.error = payload ?? error;
					state.loading = false;
				},
			},
		),
	}),
	selectors: {
		selectTransactions: (state) => state.entities,
		selectLoading: (state) => state.loading,
		selectError: (state) => state.error,
		selectLimitItems: (state) => state.limitItems,
		selectTotalPages: (state) => state.totalPages,
		selectCurrentPage: (state) => state.currentPage,
	},
});

const { actions, reducer, selectors } = transactionsSlice;
export const {
	reset: resetTransactions,
	fetchTransactions,
	saveTransaction,
	addTransaction,
	deleteTransation,
	updateTransation,
} = actions;
export const {
	selectTransactions,
	selectLoading,
	selectError,
	selectLimitItems,
	selectTotalPages,
	selectCurrentPage,
} = selectors;

export const selectTransaction = (id) => (state) =>
	state.transactions.entities.find((t) => t._id === id);

export default reducer;
