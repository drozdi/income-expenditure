import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts } from '../../entites/accounts/accountsSlice';
import AccountsListMain from '../../features/accounts/list-main';
import { currencyFormat } from '../../shared/utils/currency-format';

export function MainPage() {
	const dispatch = useDispatch();
	const accounts = useSelector(getAccounts);

	const totalBalance = useMemo(
		() => accounts.reduce((acc, account) => acc + account.balance, 0),
		[accounts],
	);
	return (
		<div className="">
			<h2>Счета {currencyFormat(totalBalance)}</h2>
			<AccountsListMain />
		</div>
	);
}
