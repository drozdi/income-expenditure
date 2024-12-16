import { useDispatch, useSelector } from 'react-redux';
import { getAccounts, getLoading } from '../../entites/accounts/accountsSlice';
import AddBtn from '../../features/account/add';
import SourcesList from '../../features/accounts/list';
import { useToast } from '../../features/toast';
export function AccountsPage() {
	const toast = useToast();
	const dispatch = useDispatch();
	const accounts = useSelector(getAccounts);
	const isLoading = useSelector(getLoading);
	return (
		<>
			<SourcesList accounts={accounts} />
			<AddBtn className="float-end" />
		</>
	);
}
