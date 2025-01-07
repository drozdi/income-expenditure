import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts, selectTotalBalance } from '../../entites/accounts/accountsSlice';
import MainAccounts from '../../features/main/accounts';
import { currencyFormat } from '../../shared/utils/currency-format';

export function WidgetAccountsList(props) {
	const dispatch = useDispatch();
	const accounts = useSelector(selectAccounts);
	const totalBalance = useSelector(selectTotalBalance);

	return (
		<Box {...props}>
			<h2>
				Счета <small>{currencyFormat(totalBalance)}</small>
			</h2>
			<MainAccounts />
		</Box>
	);
}
