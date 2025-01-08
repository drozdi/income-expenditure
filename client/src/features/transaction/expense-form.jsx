//expense: 'Расход'

import LoadingButton from '@mui/lab/LoadingButton';
import {
	Button,
	Divider,
	FilledInput,
	FormControl,
	InputAdornment,
	InputLabel,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { useNotifications } from '@toolpad/core/useNotifications';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { accountBalance, selectAccounts } from '../../entites/accounts/accountsSlice';
import { selectCategories } from '../../entites/categories/categoriesSlice';
import {
	saveTransaction,
	selectLoading,
	selectTransaction,
} from '../../entites/transactions/transactionsSlice';
import { currencyFormat } from '../../shared/utils/currency-format';

export default function ExpenseForm({ className, id, account }) {
	const navigate = useNavigate();
	const transaction = useSelector(selectTransaction(id));
	const notifications = useNotifications();
	const dispatch = useDispatch();
	const accounts = useSelector(selectAccounts) || [];
	const loading = useSelector(selectLoading);

	const [type, setType] = useState(
		(!transaction?.link && transaction?.type) || transaction?.link || 'transfer',
	);
	const [currentAccount, setCurrentAccount] = useState(
		transaction?.account._id || transaction?.account || account,
	);
	const [currentCategory, setCurrentCategory] = useState(
		(!transaction?.link && (transaction?.category._id || transaction?.category)) ||
			undefined,
	);
	const [transferAccount, setTransferAccount] = useState(transaction?.link?.account);
	const [date, setDate] = useState(dayjs(transaction?.date));
	const [amount, setAmount] = useState(transaction?.amount || '');
	const [comment, setComment] = useState(transaction?.comment || '');

	const categories = useSelector(selectCategories(currentAccount)) || [];
	const groupedCategories = categories.filter(
		(category) => category.type === 'expense',
	);

	useEffect(() => {
		setType(undefined);
		setCurrentCategory(undefined);
		setTransferAccount(undefined);
	}, [currentAccount]);
	useEffect(() => {
		setTransferAccount(undefined);
		currentCategory && setTimeout(() => setCurrentCategory(currentCategory), 0);
		if (currentCategory) {
			setType('expense');
		}
	}, [currentCategory]);
	useEffect(() => {
		setCurrentCategory(undefined);
		transferAccount && setTimeout(() => setTransferAccount(transferAccount), 0);
		if (transferAccount) {
			setType('transfer');
		}
	}, [transferAccount]);

	const onSave = async () => {
		const formData = {
			_id: id,
			type,
			account: currentAccount,
			category: currentCategory,
			to: transferAccount,
			date: date.$d,
			amount,
			comment,
		};

		dispatch(saveTransaction(formData))
			.unwrap()
			.then(({ payload }) => {
				const transactions = [].concat(payload);
				for (let transaction of transactions) {
					dispatch(accountBalance(transaction));
				}
				console.log(payload);
				setCurrentAccount(undefined);
				setAmount('');
				setComment('');
				notifications.show(
					id ? `Транзакция успешна изменена!` : `Транзакция успешна создана!`,
					{
						severity: 'success',
						autoHideDuration: 3000,
					},
				);
				if (id) {
					navigate(-1);
				}
			})
			.catch(({ error }) => {
				notifications.show(error, {
					severity: 'error',
					autoHideDuration: 3000,
				});
			}); //*/
	};

	const cheack =
		type && currentAccount && (currentCategory || transferAccount) && amount;

	return (
		<Stack className={className} orientation="column" spacing={1}>
			<Typography variant="h6">Откуда:</Typography>
			<Stack
				direction="row"
				spacing={1}
				flexWrap="wrap"
				useFlexGap
				alignItems="stretch"
				justifyContent="flex-start"
			>
				{accounts.map((account) => (
					<Stack
						key={account._id}
						direction="column"
						spacing={2}
						justifyContent="space-between"
						alignItems="stretch"
						variant={currentAccount === account._id ? 'contained' : 'text'}
						component={Button}
						value={account._id}
						onClick={() => setCurrentAccount(account._id)}
					>
						<Typography variant="caption">
							{currencyFormat(account.balance)}
						</Typography>
						<Typography variant="caption" sx={{ marginTop: '0 !important' }}>
							{account.label}
						</Typography>
					</Stack>
				))}
			</Stack>
			<Typography variant="h6">Куда:</Typography>
			<Stack
				direction="row"
				spacing={1}
				useFlexGap
				flexWrap="wrap"
				alignItems="stretch"
				justifyContent="flex-start"
			>
				{groupedCategories.map((category) => (
					<Stack
						key={category._id}
						direction="column"
						spacing={2}
						justifyContent="space-between"
						alignItems="stretch"
						variant={
							currentCategory === category._id ? 'contained' : 'outlined'
						}
						component={Button}
						value={category._id}
						onClick={() => setCurrentCategory(category._id)}
					>
						<Typography variant="caption" sx={{ marginTop: '0 !important' }}>
							{category.label}
						</Typography>
					</Stack>
				))}
				<Divider flexItem orientation="vertical" />
				{accounts.map((account) => (
					<Stack
						key={account._id}
						direction="column"
						spacing={2}
						justifyContent="space-between"
						alignItems="stretch"
						variant={
							transferAccount === account._id ? 'contained' : 'outlined'
						}
						component={Button}
						value={account._id}
						disabled={currentAccount === account._id}
						onClick={() => setTransferAccount(account._id)}
					>
						<Typography variant="caption">{account.label}</Typography>
						<Typography variant="caption" sx={{ marginTop: '0 !important' }}>
							{currencyFormat(account.balance)}
						</Typography>
					</Stack>
				))}
			</Stack>
			<Divider flexItem />
			<MobileDateTimePicker
				required
				format="YYYY-MM-DD HH:mm"
				views={['year', 'month', 'day', 'hours', 'minutes']}
				defaultValue={date}
				onChange={setDate}
			/>
			<FormControl variant="filled" fullWidth>
				<InputLabel>Сумма</InputLabel>
				<FilledInput
					required
					type="number"
					value={amount}
					onChange={({ target }) => setAmount(target.value)}
					startAdornment={<InputAdornment position="start">₽</InputAdornment>}
				/>
			</FormControl>
			<TextField
				value={comment}
				onChange={({ target }) => setComment(target.value)}
				label="Коментарий"
				variant="filled"
				multiline
				rows={4}
			/>
			<Divider flexItem />
			<LoadingButton
				loading={loading}
				color="primary"
				variant="contained"
				onClick={onSave}
				disabled={!cheack}
			>
				{loading ? 'Сохранение...' : id ? 'Сохранить' : 'Добавить'}
			</LoadingButton>
		</Stack>
	);
}

ExpenseForm.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	account: PropTypes.string,
};
