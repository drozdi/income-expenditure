import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchAccounts,
	fetchTypes as fetchTypesAccounts,
	resetAccounts,
} from '../entites/accounts/accountsSlice';
import { selectUserId } from '../entites/auth/authSlice';
import {
	fetchCategories,
	fetchTypesCategories,
	resetCategories,
} from '../entites/categories/categoriesSlice';
import { fetchUser, resetSettings } from '../entites/settings/settingsSlice';
import {
	fetchTransactions,
	resetTransactions,
} from '../entites/transactions/transactionsSlice';

import { Box, CircularProgress } from '@mui/material';

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
				dispatch(fetchTypesAccounts()),
				dispatch(fetchTypesCategories()),
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
				<Box
					sx={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						zIndex: 1000,
					}}
				>
					<CircularProgress size="5em" />
				</Box>
			) : (
				children
			)}
		</>
	);
};
