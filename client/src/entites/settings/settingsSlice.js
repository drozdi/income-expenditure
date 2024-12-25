import settingsService from '../../shared/services/settings.service';
import { createSlice } from '../utils/createSlice';

const initialState = {
	user: {},
	loading: false,
	error: null,
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: (create) => ({
		reset: create.reducer(() => initialState),
		setUser: create.reducer((state, { payload }) => ({
			...state,
			user: payload,
		})),
		setLoading: create.reducer((state, { payload }) => ({
			...state,
			loading: payload,
		})),
		setError: create.reducer((state, { payload }) => ({
			...state,
			error: payload,
		})),
		fetchUser: create.asyncThunk(
			async (payload, { rejectWithValue }) => {
				try {
					const { data } = await settingsService.getUser();
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
					state.user = payload;
					state.loading = false;
				},
				rejected: (state, { payload, error }) => {
					state.error = payload ?? error;
					state.loading = false;
				},
			},
		),
		saveUser: create.asyncThunk(
			async (payload, { rejectWithValue }) => {
				try {
					const { data } = await settingsService.updateUser(payload);
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
					state.user = payload;
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
		selectUser: (state) => state.user,
		selectLoading: (state) => state.loading,
		selectError: (state) => state.error,
	},
});

const { selectors, actions, reducer } = settingsSlice;

export const { fetchUser, saveUser, reset: resetSettings } = actions;
export const { selectUser, selectLoading, selectError } = selectors;

export default reducer;
