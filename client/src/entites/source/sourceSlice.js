import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import sourceService from '../../shared/services/source.service';

const initialState = {
	entities: [],
	isLoading: false,
	error: null,
};

export const sourceSlice = createSlice({
	name: 'source',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSources.pending, (state, actions) => {
			state.isLoading = true;
		});
		builder.addCase(fetchSources.fulfilled, (state, actions) => {
			state.entities = actions.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchSources.rejected, (state, actions) => {
			state.error = actions.payload;
			state.isLoading = false;
		});
	},
});

const { actions, reducer } = sourceSlice;
export const {} = actions;

export const fetchSources = createAsyncThunk(
	'source/fetchSources',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await sourceService.getSources();
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const getSources = (state) => {
	return state.source.entities;
};
export const getLoading = (state) => {
	return state.source.isLoading;
};

export default reducer;
