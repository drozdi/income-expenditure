import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from '../../entites/accounts/accountsSlice';
import authReducer from '../../entites/auth/authSlice';
import categoriesReducer from '../../entites/categories/categoriesSlice';
import operationsReducer from '../../entites/operations/operationsSlice';
import transactionsReducer from '../../entites/transactions/transactionsSlice';

const rootReducer = {
	auth: authReducer,
	accounts: accountsReducer,
	operations: operationsReducer,
	categories: categoriesReducer,
	transactions: transactionsReducer,
};

export const createStore = () => {
	const store = configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
	});
	return store;
};
