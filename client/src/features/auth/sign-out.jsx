import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetAccounts } from '../../entites/accounts/accountsSlice';
import { logoutUser } from '../../entites/auth/authSlice';
import { resetCategories } from '../../entites/categories/categoriesSlice';
import { resetSettings } from '../../entites/settings/settingsSlice';
import { resetTransactions } from '../../entites/transactions/transactionsSlice';

export default (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logOut = () => {
		dispatch(logoutUser())
			.unwrap()
			.then(() => {
				dispatch(resetAccounts());
				dispatch(resetCategories());
				dispatch(resetSettings());
				dispatch(resetTransactions());
				navigate('/auth/signIn');
			});
	};
	return (
		<Button {...props} onClick={logOut}>
			Выйти
		</Button>
	);
};
