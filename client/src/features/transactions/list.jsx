import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectCurrentPage,
	selectLimitItems,
	selectTotalPages,
	selectTransactions,
	setPpagination,
} from '../../entites/transactions/transactionsSlice';

import { useSearchParams } from 'react-router-dom';

import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import TransactionsItem from './item';

export default function TransactionsList({ className }) {
	const dispatch = useDispatch();
	const transactions = useSelector(selectTransactions);
	const currentPage = useSelector(selectCurrentPage);
	const totalPages = useSelector(selectTotalPages);
	const limitItems = useSelector(selectLimitItems);

	const [search, setSearch] = useSearchParams();

	const filtered = useMemo(() => {
		const type = search.get('type') || '';
		const account = search.get('account') || '';
		const category = search.get('category') || '';

		const from = search.get('from');
		const to = search.get('to');

		return (
			transactions?.filter((transaction) => {
				if (type && transaction.type !== type) return false;
				if (account && transaction.account !== account) return false;
				if (category && transaction.category !== category) return false;
				if (from && dayjs(transaction.date).diff(from, 'h') <= 0) return false;
				if (to && dayjs(transaction.date).diff(to + 'T23:59:59', 'ms') > 0)
					return false;

				return true;
			}) || []
		);
	}, [transactions, search]);

	const arr = useMemo(
		() =>
			filtered.slice(
				currentPage * limitItems,
				currentPage * limitItems + limitItems,
			),
		[filtered, currentPage, limitItems],
	);

	useEffect(() => {
		dispatch(setPpagination({ totalItems: filtered.length }));
	}, [filtered]);

	return (
		<>
			<TableHead>
				<TableRow>
					<TableCell>Дата</TableCell>
					<TableCell>Счет</TableCell>
					<TableCell>Сумма</TableCell>
					<TableCell>Категория</TableCell>
					<TableCell>Действия</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{arr.map((transaction) => (
					<TransactionsItem transaction={transaction} key={transaction._id} />
				))}
			</TableBody>
		</>
	);
}

TransactionsList.propTypes = {
	className: PropTypes.string,
};
