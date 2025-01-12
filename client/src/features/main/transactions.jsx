import { List, ListItem, ListItemButton, ListItemText, Pagination } from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMapCategories } from '../../entites/categories/hooks';
import { selectTransactions } from '../../entites/transactions/transactionsSlice';
import Link from '../../shared/link';
import { currencyFormat } from '../../shared/utils/currency-format';

export default function MainTransactions({ limit = 3 }) {
	const transactions = useSelector(selectTransactions);
	const [page, setPage] = useState(1);
	const count = ~~((transactions.length - 1) / limit) + 1;
	const mapsCategories = useMapCategories();

	if (!transactions?.length) {
		return <div align="center">Операций пока нет</div>;
	}
	const filtered = useMemo(
		() => transactions?.filter(() => true) || [],
		[transactions],
	);
	const sorted = useMemo(() => {
		return (
			filtered.sort((a, b) => {
				if (a.date > b.date) return -1;
				if (a.date < b.date) return 1;
				return 0;
			}) || []
		);
	}, [filtered]);

	const selected = useMemo(
		() => sorted.slice((page - 1) * limit, page * limit),
		[sorted, page, limit],
	);

	return (
		<>
			<List dense>
				{selected?.map(
					(transaction) =>
						transaction && (
							<ListItem
								key={transaction._id}
								disablePadding
								secondaryAction={
									(transaction.type === 'income' ? '+' : '-') +
									currencyFormat(transaction.amount)
								}
							>
								<ListItemButton
									component={Link}
									to={`/transaction/${transaction.type}/${transaction._id}`}
								>
									<ListItemText>
										{dayjs(transaction.date).format(
											'YYYY-MM-DD HH:mm',
										)}{' '}
										{
											mapsCategories[transaction.account][
												transaction.category
											]
										}
									</ListItemText>
								</ListItemButton>
							</ListItem>
						),
				)}
			</List>
			<Pagination
				count={count}
				onChange={(e, v) => setPage(v)}
				variant="outlined"
			/>
		</>
	);
}
MainTransactions.propTypes = { limit: PropTypes.number };
