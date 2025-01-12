import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts, selectTotalBalance } from '../../entites/accounts/accountsSlice';
import MainAccounts from '../../features/main/accounts';
import { currencyFormat } from '../../shared/utils/currency-format';

export function WidgetAccountsList({ onClick, ...props }) {
	const dispatch = useDispatch();
	const accounts = useSelector(selectAccounts);
	const totalBalance = useSelector(selectTotalBalance);

	return (
		<Box {...props}>
			<h2>
				Счета <small>{currencyFormat(totalBalance)}</small>
			</h2>
			<MainAccounts onClick={onClick} />
		</Box>
	);
}

WidgetAccountsList.propTypes = {
	onClick: PropTypes.func,
};
