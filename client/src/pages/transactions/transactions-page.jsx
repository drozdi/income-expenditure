import {
	Paper,
	Table,
	TableContainer,
	TableFooter,
	TableRow,
	Typography,
} from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import TransactionsFilter from '../../features/transactions/filter';
import TransactionsList from '../../features/transactions/list';
import TransactionsPagination from '../../features/transactions/pagination';

export function TransactionsPage() {
	const {} = useParams();
	const [search, setSearch] = useSearchParams();
	const account = search.get('account');
	return (
		<>
			<Typography gutterBottom variant="h5" align="center">
				История
			</Typography>
			<TransactionsFilter />
			<TableContainer component={Paper}>
				<Table size="small" aria-label="simple table">
					<TransactionsList />
					<TableFooter>
						<TableRow>
							<TransactionsPagination />
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</>
	);
}
