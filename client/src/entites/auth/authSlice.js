import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../shared/services/auth.service';
import localStorageService from '../../shared/services/localStorage.service';

const initialState = localStorageService.getAccessToken()
	? {
			isLoading: true,
			error: null,
			auth: { userId: localStorageService.getUserId() },
			isAuth: true,
		}
	: {
			isLoading: false,
			error: null,
			auth: null,
			isAuth: false,
		};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	selectors: {},
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(registerUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isAuth = true;
			state.auth = action.payload;
		});
		builder.addCase(registerUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isAuth = false;
			state.error = action.payload;
		});

		builder.addCase(loginUser.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isAuth = true;
			state.auth = action.payload;
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isAuth = false;
			state.error = action.payload;
		});
		builder.addCase(logoutUser.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(logoutUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isAuth = false;
			state.auth = null;
			state.dataLoaded = false;
		});
		builder.addCase(logoutUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isAuth = false;
			state.error = action.payload;
		});
	},
});

const { actions, reducer } = authSlice;

export const registerUser = createAsyncThunk(
	'auth/register',
	async (data, { rejectWithValue }) => {
		try {
			const res = await authService.register(data);
			localStorageService.setTokens(res);
			return { userId: res.userId };
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);
export const loginUser = createAsyncThunk(
	'auth/login',
	async (data, { rejectWithValue }) => {
		try {
			const res = await authService.login(data);
			localStorageService.setTokens(res);
			return { userId: res.userId };
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);
export const logoutUser = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			const res = await authService.logout();
			return res;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const getIsAuth = (state) => state.auth.isAuth;
export const getIsLoading = (state) => state.auth.isLoading;
export const getCurrentUserId = (state) => state.auth.auth.userId;
export const getAuthError = (state) => state.auth.error;

export default reducer;
