import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import transactionsService from '../../shared/services/transactions.service';

const initialState = {
	entities: [],
	isLoading: false,
	error: null,
};

export const fetchTransactions = createAsyncThunk(
	'transactions/fetch',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await transactionsService.getTransactions();
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const transactionsSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchTransactions.pending, (state, actions) => {
			state.isLoading = true;
		});
		builder.addCase(fetchTransactions.fulfilled, (state, { payload }) => {
			state.entities = payload;
			state.isLoading = false;
		});
		builder.addCase(fetchTransactions.rejected, (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		});
	},
});

const { actions, reducer } = transactionsSlice;
export const {} = actions;

export const getTransactions = (state) => {
	return state.transactions.entities;
};

export default reducer;

// const postReducer = (state = initialState, action) => {
//  switch (action.type) {
//   case 'DELETE_POST':
//    return {
//     ...state,
//     entities: state.entities.filter((post) => post.id !== action.payload),
//    }
//   case 'ADD_POST':
//    return {
//     ...state,
//     entities: [...state.entities, action.payload],
//    }
//   case 'UPDATE_POST':
//    return {
//     ...state,
//     entities: state.entities.map((post) => {
//      if (post.id === action.payload.id) {
//       return {
//        ...post,
//        ...action.payload, }
//       }
