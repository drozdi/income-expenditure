import { useParams, useSearchParams } from 'react-router-dom';
import TransactionsList from '../../features/transactions/list';

export function TransactionsPage() {
	const {} = useParams();
	const [search, setSearch] = useSearchParams();
	const account = search.get('account');
	return <TransactionsList />;
}
