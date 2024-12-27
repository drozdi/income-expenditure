import { Navigate, useParams } from 'react-router-dom';
import ExpenseForm from '../../features/transaction/expense-form';
import IncomeForm from '../../features/transaction/income-form';
export function TransactionPage() {
	const { type } = useParams();
	return (
		<div>
			{type === 'income' ? (
				<IncomeForm />
			) : type === 'expense' ? (
				<ExpenseForm />
			) : (
				<Navigate to="/404" />
			)}
		</div>
	);
}
