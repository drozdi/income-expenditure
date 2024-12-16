import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from '../../entites/accounts/accountsSlice';
import authReducer from '../../entites/auth/authSlice';
import operationsReducer from '../../entites/operations/operationsSlice';

const rootReducer = {
	auth: authReducer,
	accounts: accountsReducer,
	operations: operationsReducer,
};

export const createStore = () => {
	const store = configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
	});
	return store;
};
