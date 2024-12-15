import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAccounts } from '../entites/accounts/accountsSlice';
import localStorageService from '../shared/services/localStorage.service';
import { XSpinner } from '../shared/ui';

export const AppLoader = ({ children }) => {
	const [isLoading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const userId = localStorageService.getUserId();
	useEffect(() => {
		setLoading(true);
		dispatch(fetchAccounts())
			.unwrap()
			.then(() => setLoading(false))
			.catch(() => setLoading(false));
	}, [userId]);
	return (
		<>
			{children}
			{isLoading && (
				<div className="fixed top-0 left-0 h-screen w-screen backdrop-blur bg-white/10 flex justify-center content-center items-center z-50">
					<XSpinner size="10em" thickness={3} color="primary" />
				</div>
			)}
		</>
	);
};
