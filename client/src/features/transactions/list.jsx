import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
	IconButton,
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
import { currencyFormat } from '../../shared/utils/currency-format';
export default function TransactionsList({ className }) {
	const {
		entities: transactions,
		limitItems,
		totalPages,
		currentPage,
	} = useSelector((state) => state.transactions);

	return (
		<div className={className}>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Дата</TableCell>
							<TableCell>Категория</TableCell>
							<TableCell>Сумма</TableCell>
							<TableCell>Комментарий</TableCell>
							<TableCell>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{transactions.map((transaction) => (
							<TableRow key={transaction._id}>
								<TableCell>
									{new Date(transaction.date).toLocaleDateString()}
								</TableCell>
								<TableCell>{transaction.category}</TableCell>
								<TableCell>
									{currencyFormat(transaction.amount)}
								</TableCell>
								<TableCell>{transaction.comment}</TableCell>
								<TableCell>
									<IconButton aria-label="Изменить" title="Изменить">
										<EditIcon />
									</IconButton>
									<IconButton aria-label="Удалить" title="Удалить">
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
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
