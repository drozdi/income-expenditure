import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAccount } from '../../entites/accounts/accountsSlice';
import AccountForm from '../../features/account/form';

export function AccountPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const account = useSelector(getAccount(id)) ?? {
		_id: id,
		label: '',
		balance: 0.0,
	};

	return (
		<div>
			<AccountForm id={id} account={account} onSave={() => navigate(-1)} />
		</div>
	);
}
