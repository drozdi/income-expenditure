import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts, resetAccounts } from '../entites/accounts/accountsSlice';
import { selectUserId } from '../entites/auth/authSlice';
import {
	fetchCategories,
	fetchTypes,
	resetCategories,
} from '../entites/categories/categoriesSlice';
import { fetchUser, resetSettings } from '../entites/settings/settingsSlice';
import {
	fetchTransactions,
	resetTransactions,
} from '../entites/transactions/transactionsSlice';

import { CircularProgress } from '@mui/material';

export const AppLoader = ({ children }) => {
	const [isLoading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	useEffect(() => {
		dispatch(resetAccounts());
		dispatch(resetCategories());
		dispatch(resetSettings());
		dispatch(resetTransactions());
		if (userId) {
			setLoading(true);
			Promise.all([
				dispatch(fetchTypes()),
				dispatch(fetchAccounts()),
				dispatch(fetchCategories()),
				dispatch(fetchTransactions()),
			])
				.then(() => {
					return dispatch(fetchUser());
				})
				.finally(() => setLoading(false)); //*/
		}
	}, [userId]);
	return (
		<>
			{isLoading ? (
				<div className="fixed top-0 left-0 h-screen w-screen backdrop-blur bg-white/10 flex justify-center content-center items-center z-50">
					<CircularProgress size="5em" />
				</div>
			) : (
				children
			)}
		</>
	);
};
