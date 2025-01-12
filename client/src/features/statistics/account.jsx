import { Box, Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
	selectAccount,
	selectTypes as selectAccountTypes,
} from '../../entites/accounts/accountsSlice';
import { selectCategories, selectTypes } from '../../entites/categories/categoriesSlice';
import { selectTransactionAccount } from '../../entites/transactions/transactionsSlice';
import { currencyFormat } from '../../shared/utils/currency-format';
import { randomColor } from '../../shared/utils/randomColor';
export default function StatisticsAccount({ from, to, accountId }) {
	const account = useSelector(selectAccount(accountId));
	if (!account) {
		return '';
	}

	const types = useSelector(selectTypes);
	const accountTypes = useSelector(selectAccountTypes);
	const categories = useSelector(selectCategories(accountId)) || [];
	const transactions = useSelector(selectTransactionAccount(accountId)) || [];

	const fromDate = dayjs(
		dayjs(from ? from : dayjs().format('YYYY-MM') + '-01').format('YYYY-MM-DD') +
			'T00:00:00',
	);
	const toDate = dayjs(
		dayjs(to ? to : fromDate.format('YYYY-MM') + '-31').format('YYYY-MM-DD') +
			'T23:59:59',
	);

	const filtered = useMemo(() => {
		return (
			transactions?.filter((transaction) => {
				if (fromDate && fromDate.unix() - dayjs(transaction.date).unix() > 0)
					return false;
				if (toDate && dayjs(transaction.date).unix() - toDate.unix() > 0)
					return false;
				return !!transaction.amount;
			}) || []
		);
	}, [transactions, fromDate, toDate]);

	const { data, typesValue } = useMemo(() => {
		const data = {};
		const typesValue = {
			expense: 0,
			income: 0,
		};
		let transferCategory;
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
		for (const transaction of filtered) {
			typesValue[transaction.type] += transaction.amount;
			if (transaction.category === transferCategory) {
				data[transferCategory + transaction.type].total += transaction.amount;
			} else {
				data[transaction.category].total += transaction.amount;
			}
		}
		return { data, typesValue };
	}, [filtered, categories]);

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
					valueFormatter: (v) => currencyFormat(v.value || 0),
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
			series: [{ data: values, valueFormatter: (v) => currencyFormat(v || 0) }],
		};
	}, [data]);

	return (
		<Box>
			<Stack
				direction="row"
				spacing={2}
				justifyContent="space-between"
				alignItems="center"
			>
				<Typography align="center" variant="h4" gutterBottom>
					{account.label}{' '}
					<Typography variant="overline" sx={{ fontSize: '0.65em' }}>
						({accountTypes[account.type] || account.type})
					</Typography>
				</Typography>
				<Typography variant="overline">
					{fromDate.format('YYYY-MM-DD')} - {toDate.format('YYYY-MM-DD')}
				</Typography>
			</Stack>

			<Stack direction="row" spacing={2} flexWrap="wrap">
				<Box>
					<Typography align="center">
						Доход: {currencyFormat(typesValue.income || 0)}
					</Typography>
					<BarChart {...propsIncome} width={500} height={300} />
				</Box>

				<Box>
					<Typography align="center">
						Расход: {currencyFormat(typesValue.expense || 0)}
					</Typography>
					<PieChart {...propsExpense} width={500} height={300} />
				</Box>

				<Box>
					<Typography align="center">
						Остаток: {currencyFormat(+typesValue.income - typesValue.expense)}
					</Typography>
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
						series={[
							{
								data: [typesValue.income, typesValue.expense],
								valueFormatter: (v) => currencyFormat(v || 0),
							},
						]}
						width={500}
						height={300}
					/>
				</Box>
			</Stack>
		</Box>
	);
}

StatisticsAccount.propTypes = {
	accountId: PropTypes.string,
	from: PropTypes.string,
	to: PropTypes.string,
};
