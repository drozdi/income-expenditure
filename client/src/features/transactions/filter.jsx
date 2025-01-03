import { FormControl, InputLabel, MenuItem, Select, Toolbar } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { selectAccounts } from '../../entites/accounts/accountsSlice';
import { selectCategories, selectTypes } from '../../entites/categories/categoriesSlice';

export default function TransactionsFilters() {
	const [search, setSearch] = useSearchParams();

	const [type, setType] = useState(search.get('type') || '');
	const [account, setAccount] = useState(search.get('account') || '');
	const [category, setCategory] = useState(search.get('category') || '');

	const accounts = useSelector(selectAccounts);
	const types = useSelector(selectTypes);

	const categories = useSelector(selectCategories(account)) || [];
	const grouped = useMemo(() => {
		return categories.filter((category) => category.type === type);
	}, [categories, type]);

	useEffect(() => {
		if (!account || !type) {
			setCategory('');
		}
	}, [account, type]);

	useEffect(() => setSearch({ account, type, category }), [account, type, category]);

	return (
		<Toolbar variant="dense" disableGutters sx={{ mb: 2 }}>
			<FormControl size="small" fullWidth variant="filled">
				<InputLabel>Тип</InputLabel>
				<Select
					value={type}
					label="Тип"
					name="type"
					onChange={({ target }) => setType(target.value)}
				>
					<MenuItem value="">
						<em>Тип</em>
					</MenuItem>
					{Object.entries(types).map(([value, label]) => (
						<MenuItem key={value} value={value}>
							{label}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl size="small" fullWidth variant="filled">
				<InputLabel>Счет</InputLabel>
				<Select
					value={account}
					label="Счет"
					name="account"
					onChange={({ target }) => setAccount(target.value)}
				>
					<MenuItem value="">
						<em>Счет</em>
					</MenuItem>
					{accounts.map(({ _id, label }) => (
						<MenuItem key={_id} value={_id}>
							{label}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl
				size="small"
				fullWidth
				variant="filled"
				disabled={!(account && type)}
			>
				<InputLabel>Категория</InputLabel>
				<Select
					value={category}
					label="Категория"
					name="category"
					onChange={({ target }) => setCategory(target.value)}
				>
					<MenuItem value="">
						<em>Категория</em>
					</MenuItem>
					{grouped.map(({ _id, label }) => (
						<MenuItem key={_id} value={_id}>
							{label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Toolbar>
	);
}
