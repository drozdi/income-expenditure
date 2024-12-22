import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts, resetAccounts } from '../entites/accounts/accountsSlice';
import { getCurrentUserId } from '../entites/auth/authSlice';
import {
	fetchCategories,
	fetchTypes,
	resetCategories,
} from '../entites/categories/categoriesSlice';

import { CircularProgress } from '@mui/material';
import localStorageService from '../shared/services/localStorage.service';

export const AppLoader = ({ children }) => {
	const [isLoading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const _userId = localStorageService.getUserId();
	const userId = useSelector(getCurrentUserId);
	useEffect(() => {
		dispatch(resetAccounts());
		dispatch(resetCategories());
		if (userId) {
			setLoading(true);
			Promise.all([
				dispatch(fetchTypes()),
				dispatch(fetchAccounts()),
				dispatch(fetchCategories()),
			]).finally(() => setLoading(false));
		}
	}, [userId]);
	return (
		<>
			{children}
			{isLoading && (
				<div className="fixed top-0 left-0 h-screen w-screen backdrop-blur bg-white/10 flex justify-center content-center items-center z-50">
					<CircularProgress size="5em" />
				</div>
			)}
		</>
	);
};
