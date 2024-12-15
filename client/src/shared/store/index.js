import { configureStore } from '@reduxjs/toolkit';
import accountsSlice from '../../entites/accounts/accountsSlice';
import authReducer from '../../entites/auth/authSlice';

const rootReducer = {
	auth: authReducer,
	accounts: accountsSlice,
};

export const createStore = () => {
	const store = configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
	});
	return store;
};
