import { useDispatch, useSelector } from 'react-redux';
import { getAccounts, getLoading } from '../../entites/accounts/accountsSlice';
import AccountsList from '../../features/accounts/list';
import { useToast } from '../../features/toast';
export function AccountsPage() {
	const toast = useToast();
	const dispatch = useDispatch();
	const accounts = useSelector(getAccounts);
	const isLoading = useSelector(getLoading);
	return (
		<>
			<AccountsList />
		</>
	);
}
