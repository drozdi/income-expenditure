import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { useDialogs } from '@toolpad/core/useDialogs';
import { useNotifications } from '@toolpad/core/useNotifications';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { accountBalance, selectAccountLabel } from '../../entites/accounts/accountsSlice';
import { selectCategoryLabel } from '../../entites/categories/categoriesSlice';
import { deleteTransation } from '../../entites/transactions/transactionsSlice';
import Link from '../../shared/link';
import { currencyFormat } from '../../shared/utils/currency-format';

export default function TransactionsItem({ className, transaction }) {
	const notifications = useNotifications();
	const dialogs = useDialogs();
	const dispatch = useDispatch();
	const label = useSelector(
		selectCategoryLabel(transaction.account, transaction.category),
	);
	const handlerDelete = async () => {
		const deleteConfirmed = await dialogs.confirm(
			`Точно хотите удалить транзакцию "${label}" ${dayjs(transaction.date).format('YYYY-MM-DD HH:mm')}?`,
			{
				title: 'Удалить?',
				okText: 'Да',
				cancelText: 'Отмена',
			},
		);

		if (deleteConfirmed) {
			dispatch(deleteTransation(transaction._id))
				.unwrap()
				.then((data) => {
					const transactions = [].concat(data);
					for (let t of transactions) {
						dispatch(accountBalance(t));
					}
					notifications.show(
						`Транзакция "${label}" ${dayjs(transaction.date).format('YYYY-MM-DD HH:mm')} успешно удалена!`,
						{
							severity: 'success',
							autoHideDuration: 3000,
						},
					);
				})
				.catch(({ error }) => {
					notifications.show(error, {
						severity: 'error',
						autoHideDuration: 3000,
					});
				});
		}
	};
	return (
		<TableRow className={className}>
			<TableCell>{dayjs(transaction.date).format('YYYY-MM-DD HH:mm')}</TableCell>
			<TableCell>{useSelector(selectAccountLabel(transaction.account))}</TableCell>
			<TableCell>
				{(transaction.type === 'income' ? '+' : '-') +
					currencyFormat(transaction.amount)}
			</TableCell>
			<TableCell>{label}</TableCell>
			<TableCell>
				<IconButton
					component={Link}
					to={`/transaction/${transaction.type}/${transaction._id}`}
					aria-label="Изменить"
					title="Изменить"
				>
					<EditIcon />
				</IconButton>
				<IconButton aria-label="Удалить" title="Удалить" onClick={handlerDelete}>
					<DeleteIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
}

TransactionsItem.propTypes = {
	className: PropTypes.string,
	transaction: PropTypes.object,
};
