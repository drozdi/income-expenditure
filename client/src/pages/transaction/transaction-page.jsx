import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import ExpenseForm from '../../features/transaction/expense-form';
import IncomeForm from '../../features/transaction/income-form';
export function TransactionPage() {
	const { type } = useParams();
	const [search, setSearch] = useSearchParams();
	const account = search.get('account');
	return (
		<div>
			{type === 'income' ? (
				<IncomeForm account={account} />
			) : type === 'expense' ? (
				<ExpenseForm account={account} />
			) : (
				<Navigate to="/404" />
			)}
		</div>
	);
}
