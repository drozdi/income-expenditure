import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount } from '../../entites/accounts/accountsSlice';
import { selectCategories } from '../../entites/categories/categoriesSlice';
import { selectTransactionAccount } from '../../entites/transactions/transactionsSlice';
import { currencyFormat } from '../../shared/utils/currency-format';
import { randomColor } from '../../shared/utils/randomColor';
export default function StatisticsAccountExpense({ accountId }) {
	const dispatch = useDispatch();
	const account = useSelector(selectAccount(accountId));
	const categories = useSelector(selectCategories(accountId)) || [];
	const transactions = useSelector(selectTransactionAccount(accountId)) || [];

	let transferCategory;

	const data = {};

	for (const category of categories) {
		if (category.type === 'transfer') {
			transferCategory = category._id;
			continue;
		}
		data[category._id] = {
			label: category.label,
			type: category.type,
			total: 0,
		};
	}
	if (transferCategory) {
		data[transferCategory + 'expense'] = {
			label: 'Перевод',
			type: 'expense',
			total: 0,
		};
		data[transferCategory + 'income'] = {
			label: 'Перевод',
			type: 'income',
			total: 0,
		};
	}

	const typesValue = {
		expense: 0,
		income: 0,
	};

	for (const transaction of transactions) {
		typesValue[transaction.type] += transaction.amount;
		if (transaction.category === transferCategory) {
			data[transferCategory + transaction.type].total += transaction.amount;
		} else {
			data[transaction.category].total += transaction.amount;
		}
	}

	const propsExpense = useMemo(() => {
		const values = [];
		for (const key in data) {
			if (data[key].type === 'expense' && data[key].total) {
				values.push({
					label: data[key].label,
					value: data[key].total,
					color: randomColor(),
				});
			}
		}

		return {
			series: [
				{
					data: values,
					highlightScope: { highlight: 'item' },
					valueFormatter: (v) => currencyFormat(v.value),
				},
			],
		};
	}, [data]);

	return (
		<Box>
			<Typography align="center">
				<Typography variant="h6">{account.label}</Typography>
				Расход: {currencyFormat(typesValue.expense)}
			</Typography>
			<PieChart {...propsExpense} width={500} height={300} />
		</Box>
	);
}

StatisticsAccountExpense.propTypes = {
	account: PropTypes.string,
};
