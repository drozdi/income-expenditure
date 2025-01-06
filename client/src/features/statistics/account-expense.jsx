import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAccount } from '../../entites/accounts/accountsSlice';
import { selectCategories } from '../../entites/categories/categoriesSlice';
import { selectTransactionAccount } from '../../entites/transactions/transactionsSlice';
import { currencyFormat } from '../../shared/utils/currency-format';
import { randomColor } from '../../shared/utils/randomColor';

export default function StatisticsAccountExpense({ from, to, accountId }) {
	const account = useSelector(selectAccount(accountId));

	if (!account) {
		return '';
	}

	const categories = useSelector(selectCategories(accountId)) || [];
	const transactions = useSelector(selectTransactionAccount(accountId)) || [];

	const fromDate = dayjs(
		dayjs(from ? from : dayjs()).format('YYYY-MM-DD') + 'T00:00:00',
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
				return true;
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
					valueFormatter: (v) => currencyFormat(v.value),
				},
			],
		};
	}, [data]);

	return (
		<Box align="center">
			<Typography variant="h6">
				{account.label} ({fromDate.format('YYYY-MM-DD')} -{' '}
				{toDate.format('YYYY-MM-DD')})
			</Typography>
			<Typography>Расход: {currencyFormat(typesValue.expense)}</Typography>
			<PieChart {...propsExpense} width={500} height={300} />
		</Box>
	);
}

StatisticsAccountExpense.propTypes = {
	accountId: PropTypes.string,
	from: PropTypes.string,
	to: PropTypes.string,
};
