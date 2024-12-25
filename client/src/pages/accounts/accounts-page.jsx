import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts, selectLoading } from '../../entites/accounts/accountsSlice';
import AccountsList from '../../features/accounts/list';
import { useToast } from '../../features/toast';
export function AccountsPage() {
	const toast = useToast();
	const dispatch = useDispatch();
	const accounts = useSelector(selectAccounts);
	const isLoading = useSelector(selectLoading);
	return (
		<>
			<AccountsList />
		</>
	);
}
