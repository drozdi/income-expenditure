import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAccount, selectLoading } from '../../entites/accounts/accountsSlice';
import AccountForm from '../../features/account/form';

export function AccountPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const isLoading = useSelector(selectLoading);
	const account = useSelector(selectAccount(id));
	return (
		<>
			<Typography gutterBottom variant="h5" align="center">
				{account ? account.label : 'Новый счет'}
			</Typography>
			<AccountForm id={id} onSaved={() => navigate(-1)} />
		</>
	);
}
