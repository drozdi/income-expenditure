import { useSelector } from 'react-redux';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { selectTransaction } from '../../entites/transactions/transactionsSlice';
import ExpenseForm from '../../features/transaction/expense-form';
import IncomeForm from '../../features/transaction/income-form';
export function TransactionPage() {
	const { type, id } = useParams();
	const [search, setSearch] = useSearchParams();
	const account = search.get('account');
	const transaction = useSelector(selectTransaction(id));
	console.log(transaction);
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
