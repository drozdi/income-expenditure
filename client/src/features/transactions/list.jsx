import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
	selectCurrentPage,
	selectLimitItems,
	selectTotalPages,
	selectTransactions,
} from '../../entites/transactions/transactionsSlice';

import TransactionsItem from './item';

export default function TransactionsList({ className }) {
	const transactions = useSelector(selectTransactions);
	const currentPage = useSelector(selectCurrentPage);
	const totalPages = useSelector(selectTotalPages);
	const limitItems = useSelector(selectLimitItems);

	return (
		<div className={className}>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Дата</TableCell>
							<TableCell>Счет</TableCell>
							<TableCell>Сумма</TableCell>
							<TableCell>Категория</TableCell>
							<TableCell>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{transactions.map((transaction) => (
							<TransactionsItem
								transaction={transaction}
								key={transaction._id}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

TransactionsList.propTypes = {
	className: PropTypes.string,
};
