import { useDispatch, useSelector } from 'react-redux';
import { getAccounts, getTotalBalance } from '../../entites/accounts/accountsSlice';
import AccountsListCard from '../../features/accounts/list-card';
import { currencyFormat } from '../../shared/utils/currency-format';

export function WidgetList({ className }) {
	const dispatch = useDispatch();
	const accounts = useSelector(getAccounts);
	const totalBalance = useSelector(getTotalBalance);

	return (
		<div className={className}>
			<h2>
				Счета <small className="float-end">{currencyFormat(totalBalance)}</small>
			</h2>
			<AccountsListCard />
		</div>
	);
}