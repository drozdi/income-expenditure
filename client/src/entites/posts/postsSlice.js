import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	entities: [
		{ id: 2, title: 'title2', body: 'body2' },
		{ id: 1, title: 'title', body: 'body' },
	],
	isLoading: false,
	error: null,
};

export const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		deletePost: (state, { payload }) => {
			state.entities = state.entities.filter((post) => post.id !== payload);
		},
		addPost: (state, { payload }) => {
			state.entities.push(payload);
		},
		updatePost: (state, action) => {
			const { id, ...rest } = action.payload;
			const postIndexUpdate = state.entities.findIndex((post) => post.id === id);
			state.entities[postIndexUpdate] = {
				...state.entities[postIndexUpdate],
				...rest,
			};
		},
		getPostsPending: (state, { payload }) => {
			state.isLoading = true;
		},
		getPostsFulfilled: (state, { payload }) => {
			state.entities = payload;
			state.isLoading = false;
		},
		getPostsRejected: (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.pending, (state, actions) => {
			state.isLoading = true;
		});
		builder.addCase(fetchPosts.fulfilled, (state, actions) => {
			state.entities = actions.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchPosts.rejected, (state, actions) => {
			state.error = actions.payload;
			state.isLoading = false;
		});
	},
});

const { actions, reducer } = postSlice;
export const {
	deletePost,
	addPost,
	updatePost,
	getPostsPending,
	getPostsFulfilled,
	getPostsRejected,
} = actions;

// export const fetchPosts = () => async (dispatch, getState) => {
// 	dispatch(getPostsPending())
// 	try {
// 		const response = await fetch('https://jsonplaceholder.typicode.com/posts')
// 		const data = await response.json()
// 		dispatch(getPostsFulfilled(data))
// 	} catch (error) {
// 		dispatch(getPostsRejected(error))
// 	}
// }

export const fetchPosts = createAsyncThunk(
	'posts/fetchPosts',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/posts');
			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const getPost = (state) => {
	return state.post.entities;
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
