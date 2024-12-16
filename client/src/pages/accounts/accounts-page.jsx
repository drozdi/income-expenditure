import { useDispatch, useSelector } from 'react-redux';
import { getAccounts, getLoading } from '../../entites/accounts/accountsSlice';
import AddBtn from '../../features/account/add';
import SourcesList from '../../features/accounts/list';
import { Loader } from '../../features/loader';
import { useToast } from '../../features/toast';
export function AccountsPage() {
	const toast = useToast();
	const dispatch = useDispatch();
	const accounts = useSelector(getAccounts);
	const isLoading = useSelector(getLoading);
	return (
		<>
			<Loader isActive={isLoading} />
			<SourcesList accounts={accounts} />
			<AddBtn />
		</>
	);
}
