import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListSubheader,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts } from '../../entites/accounts/accountsSlice';
import Link from '../../shared/link';
import { currencyFormat } from '../../shared/utils/currency-format';
export default function CategoriesAddItem({ className }) {
	const dispatch = useDispatch();
	const accounts = useSelector(selectAccounts);

	return (
		<List className={className}>
			<ListSubheader>Категории счетов</ListSubheader>
			{accounts.map((account) => (
				<ListItem
					component={Link}
					key={account._id}
					to={`/categories/${account._id}`}
				>
					<ListItemButton>
						<ListItemText>{account.label}</ListItemText>
						<ListItemText sx={{ textAlign: 'right' }}>
							{currencyFormat(account.balance)}
						</ListItemText>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
}

CategoriesAddItem.propTypes = {
	className: PropTypes.string,
};
