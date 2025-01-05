import { Box, Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectAccount,
	selectTypes as selectAccountTypes,
} from '../../entites/accounts/accountsSlice';
import { selectCategories, selectTypes } from '../../entites/categories/categoriesSlice';
import { selectTransactionAccount } from '../../entites/transactions/transactionsSlice';
import { currencyFormat } from '../../shared/utils/currency-format';
import { randomColor } from '../../shared/utils/randomColor';
export default function StatisticsAccount({ accountId }) {
	const dispatch = useDispatch();
	const types = useSelector(selectTypes);
	const account = useSelector(selectAccount(accountId));
	const accountTypes = useSelector(selectAccountTypes);
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
		/*data[category._id].total = transactions
			.filter((t) => t.category === category._id)
			.reduce((acc, t) => acc + t.amount, 0);*/
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
		<>
			<Typography align="center" variant="h4" gutterBottom>
				{account.label}{' '}
				<Typography variant="overline" sx={{ fontSize: '0.65em' }}>
					({accountTypes[account.type] || account.type})
				</Typography>
			</Typography>
			<Stack direction="row" flexWrap="wrap">
				<Box>
					<Typography align="center">
						Доход: {currencyFormat(typesValue.income)}
					</Typography>
					<BarChart {...propsIncome} width={500} height={300} />
				</Box>

				<Box>
					<Typography align="center">
						Расход: {currencyFormat(typesValue.expense)}
					</Typography>
					<PieChart {...propsExpense} width={500} height={300} />
				</Box>

				<BarChart
					xAxis={[
						{
							scaleType: 'band',
							data: [types.income, types.expense],
							colorMap: {
								type: 'ordinal',
								colors: ['#0f0', '#f00'],
							},
						},
					]}
					series={[{ data: [typesValue.income, typesValue.expense] }]}
					width={500}
					height={300}
				/>
			</Stack>
		</>
	);
}

StatisticsAccount.propTypes = {
	account: PropTypes.string,
};
