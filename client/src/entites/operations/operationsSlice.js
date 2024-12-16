import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import operationsService from '../../shared/services/operations.service';

const initialState = {
	operations: [],
	isLoading: false,
	error: null,
};

export const fetchOperations = createAsyncThunk(
	'operations/fetchOperations',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await operationsService.getOperations();
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const operationsSlice = createSlice({
	name: 'operations',
	initialState,
	reducers: {
		reset: (state) => {
			state.operations = [];
			state.isLoading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchOperations.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchOperations.fulfilled, (state, action) => {
			state.operations = action.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchOperations.rejected, (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		});
	},
});

const { actions, reducer } = operationsSlice;
export const { reset: resetOperations } = actions;

export const getLoading = (state) => {
	return state.operations.isLoading;
};
export const getOperations = (state) => {
	return state.operations.operations || [];
};

export default reducer;
