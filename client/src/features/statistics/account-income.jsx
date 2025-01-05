import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount } from '../../entites/accounts/accountsSlice';
import { selectCategories } from '../../entites/categories/categoriesSlice';
import { selectTransactionAccount } from '../../entites/transactions/transactionsSlice';
import { currencyFormat } from '../../shared/utils/currency-format';
import { randomColor } from '../../shared/utils/randomColor';
export default function StatisticsAccountIncome({ accountId }) {
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

	const propsIncome = useMemo(() => {
		const xAxis = [];
		const values = [];
		const colors = [];
		for (const key in data) {
			if (data[key].type === 'income' && data[key].total) {
				xAxis.push(data[key].label);
				values.push(data[key].total);
				colors.push(randomColor());
			}
		}
		return {
			xAxis: [
				{
					scaleType: 'band',
					data: xAxis,
					colorMap: {
						type: 'ordinal',
						colors,
					},
				},
			],
			series: [{ data: values }],
		};
	}, [data]);

	return (
		<Box>
			<Typography align="center">
				<Typography variant="h6">{account.label}</Typography>
				Доход: {currencyFormat(typesValue.income)}
			</Typography>
			<BarChart {...propsIncome} width={500} height={300} />
		</Box>
	);
}

StatisticsAccountIncome.propTypes = {
	account: PropTypes.string,
};
