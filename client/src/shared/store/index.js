import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../entites/auth/authSlice';
import loaderReducer from '../../entites/loader/loaderSlice';
const rootReducer = {
	auth: authReducer,
	loader: loaderReducer,
};

export const createStore = () => {
	const store = configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
	});
	return store;
};
