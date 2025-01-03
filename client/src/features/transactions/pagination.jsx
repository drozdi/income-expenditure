import { TablePagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectCurrentPage,
	selectLimitItems,
	selectTotalItems,
	selectTotalPages,
	setPpagination,
} from '../../entites/transactions/transactionsSlice';

export default function TransactionsPagination() {
	const dispatch = useDispatch();
	const currentPage = useSelector(selectCurrentPage);
	const totalPages = useSelector(selectTotalPages);
	const limitItems = useSelector(selectLimitItems);
	const totalItems = useSelector(selectTotalItems);

	const handleChangePage = (event, newPage) => {
		dispatch(
			setPpagination({
				currentPage: newPage,
			}),
		);
	};
	const handleChangeRowsPerPage = (event) => {
		dispatch(
			setPpagination({
				limitItems: parseInt(event.target.value, 10),
				currentPage: 0,
			}),
		);
	};

	return (
		<TablePagination
			count={totalItems}
			page={currentPage}
			rowsPerPage={limitItems}
			onPageChange={handleChangePage}
			onRowsPerPageChange={handleChangeRowsPerPage}
		/>
	);
}
