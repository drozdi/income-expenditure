import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	active: false,
};

export const loaderSlice = createSlice({
	name: 'loader',
	initialState,
	reducers: {
		startLoader: (state) => {
			state.active = true;
		},
		stopLoader: (state) => {
			state.active = false;
		},
	},
});

const { actions, reducer } = loaderSlice;

export const { startLoader, stopLoader } = actions;

export const getActive = (state) => state.loader.active;

export default reducer;
