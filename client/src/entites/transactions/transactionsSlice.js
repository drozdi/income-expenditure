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
		setTransaction: (state, { payload }) => {
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
		saveTransaction: create.asyncThunk(async (payload, { dispatch }) => {
			if (transaction._id) {
			} else {
				dispatch(transactionsSlice.actions.addTransaction(payload));
			}
		}),
		addTransaction: create.asyncThunk(
			async (payload, { rejectWithValue }) => {
				try {
					const { data } = await transactionsService.addTransaction(payload);
					return data;
				} catch (error) {
					console.log(error);
					return rejectWithValue(error.response.data);
				}
			},
			{
				pending: (state) => {
					state.loading = true;
				},
				fulfilled: (state, { payload }) => {
					state.entities = [...state.entities, payload];
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
	},
});

const { actions, reducer, selectors } = transactionsSlice;
export const { fetchTransactions, saveTransaction, addTransaction } = actions;
export const { selectTransactions, selectLoading, selectError } = selectors;

export default reducer;
