import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../shared/api'

const initialState = localStorage.getItem('user')
	? {
			isAuth: true,
			isLoading: false,
			user: JSON.parse(localStorage.getItem('user')),
			error: null,
	  }
	: {
			isAuth: false,
			isLoading: false,
			user: null,
			error: null,
	  }

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	selectors: {
		getUser: (state) => state.user,
	},
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(registerUser.fulfilled, (state, action) => {
			state.isLoading = false
			state.isAuth = true
			state.user = action.payload.user
		})
		builder.addCase(registerUser.rejected, (state, action) => {
			state.isLoading = false
			state.isAuth = false
			state.error = action.payload
		})
		builder.addCase(loginUser.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.isLoading = false
			state.isAuth = true
			state.user = action.payload.user
		})
		builder.addCase(loginUser.rejected, (state, action) => {
			state.isLoading = false
			state.isAuth = false
			state.error = action.payload
		})
		builder.addCase(logoutUser.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(logoutUser.fulfilled, (state, action) => {
			state.isLoading = false
			state.isAuth = false
			state.user = null
		})
		builder.addCase(logoutUser.rejected, (state, action) => {
			state.isLoading = false
			state.isAuth = false
			state.error = action.payload
		})
	},
})

const { actions, reducer } = authSlice

export const registerUser = createAsyncThunk(
	'auth/register',
	async (data, { rejectWithValue }) => {
		try {
			const response = await api.post('auth/register', data)
			localStorage.setItem('token', response.data.accessToken)
			localStorage.setItem('user', JSON.stringify(response.data.user))
			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)
export const loginUser = createAsyncThunk(
	'auth/login',
	async (data, { rejectWithValue }) => {
		try {
			const response = await api.post('auth/login', data)
			localStorage.setItem('token', response.data.accessToken)
			localStorage.setItem('user', JSON.stringify(response.data.user))
			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)
export const logoutUser = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.post('auth/logout')
			localStorage.removeItem('token')
			localStorage.removeItem('user')
			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

// export const registerUser = (data) => async (dispatch, getState) => {
// 	try {
// 		const response = await api.post('auth/register', data)
// 		localStorage.setItem('token', response.data.accessToken)
// 		localStorage.setItem('user', JSON.stringify(response.data.user))
// 		return response.data
// 	} catch (error) {
// 		return error.response.data
// 	}
// }

export const getUser = (state) => state.auth.user

export default reducer
