//expense: 'Расход'

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
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts } from '../../entites/accounts/accountsSlice';
import { selectCategories } from '../../entites/categories/categoriesSlice';
import { currencyFormat } from '../../shared/utils/currency-format';

export default function () {
	const dispatch = useDispatch();
	const accounts = useSelector(selectAccounts) || [];
	const [type, setType] = useState(null);
	const [currentAccount, setCurrentAccount] = useState(null);
	const [currentCategory, setCurrentCategory] = useState(null);
	const [transferCategory, setTransferCategory] = useState(null);
	const [date, setDate] = useState(dayjs());
	const [amount, setAmount] = useState(0);
	const [comment, setComment] = useState(null);
	const categories = useSelector(selectCategories(currentAccount)) || [];
	const groupedCategories = categories.filter(
		(category) => category.type === 'expense',
	);

	useEffect(() => {
		setType(null);
		setCurrentCategory(null);
		setTransferCategory(null);
	}, [currentAccount]);
	useEffect(() => {
		setTransferCategory(null);
		if (currentCategory) {
			setType('expense');
		}
	}, [currentCategory]);
	useEffect(() => {
		setCurrentCategory(null);
		if (transferCategory) {
			setType('transfer');
		}
	}, [transferCategory]);

	const onSave = async () => {
		const formData = {
			type,
			account: currentAccount,
			category: currentCategory,
			link: transferCategory,
			date: date.$d,
			amount,
			comment,
		};
		console.log(formData);
	};

	const cheack =
		type && currentAccount && (currentCategory || transferCategory) && amount;

	return (
		<Stack orientation="column" spacing={1}>
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
							transferCategory === account._id ? 'contained' : 'outlined'
						}
						component={Button}
						value={account._id}
						disabled={currentAccount === account._id}
						onClick={() => setTransferCategory(account._id)}
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
					onChange={({ target }) => setAmount(target.value)}
					startAdornment={<InputAdornment position="start">₽</InputAdornment>}
				/>
			</FormControl>
			<TextField
				onChange={({ target }) => setComment(target.value)}
				label="Коментарий"
				variant="filled"
				multiline
				rows={4}
			/>
			<Divider flexItem />
			<Button
				color="primary"
				variant="contained"
				onClick={onSave}
				disabled={!cheack}
			>
				Добавить
			</Button>
		</Stack>
	);
}