import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getLoading } from '../../entites/accounts/accountsSlice';
import AccountForm from '../../features/account/form';

export function AccountPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const isLoading = useSelector(getLoading);
	return <AccountForm id={id} onSaved={() => navigate(-1)} />;
}
