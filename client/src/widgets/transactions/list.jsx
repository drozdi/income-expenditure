import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts, selectTotalBalance } from '../../entites/accounts/accountsSlice';
import MainTransactions from '../../features/main/transactions';

export function WidgetTransactionsList(props) {
	const dispatch = useDispatch();
	const accounts = useSelector(selectAccounts);
	const totalBalance = useSelector(selectTotalBalance);

	return (
		<Box {...props}>
			<h2>Последние операции</h2>
			<MainTransactions />
		</Box>
	);
}
