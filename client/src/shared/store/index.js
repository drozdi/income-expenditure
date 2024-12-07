import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../entites/auth/authSlice';
const rootReducer = {
	auth: authReducer,
};

export const createStore = () => {
	const store = configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
	});
	return store;
};
