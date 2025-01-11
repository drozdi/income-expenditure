import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts, selectLoading } from '../../entites/accounts/accountsSlice';
import AccountsList from '../../features/accounts/list';
export function AccountsPage() {
	const dispatch = useDispatch();
	const accounts = useSelector(selectAccounts);
	const isLoading = useSelector(selectLoading);
	return (
		<>
			<Typography gutterBottom variant="h5" align="center">
				Счета
			</Typography>
			<AccountsList />
		</>
	);
}
