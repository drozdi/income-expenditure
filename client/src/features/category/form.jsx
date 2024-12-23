import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import {
	getCategories,
	getTypes,
	saveCategory,
} from '../../entites/categories/categoriesSlice';
import { useToast } from '../toast';

const categogySchema = yup.object().shape({
	label: yup.string().required('Заполните название'),
});

export default ({ accountId, id, onSaved }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const types = useSelector(getTypes);
	const categories = useSelector(getCategories(accountId)) || [];
	const category = categories.find((t) => t._id === id);
	const toast = useToast();
	const [searchParams, setSearchParams] = useSearchParams();
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isLoading },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			_id: id,
			account: accountId,
			label: '',
			type: searchParams.get('type') || '',
		},
		resolver: yupResolver(categogySchema),
	});

	useEffect(() => {
		category && reset(category);
	}, [category]);

	const onSubmit = async (data) => {
		console.log(data);
		return;
		dispatch(saveCategory(data))
			.unwrap()
			.then((data) => {
				toast.show({
					children: 'Сохранено',
					color: 'positive',
				});
				onSaved?.(data);
			})
			.catch(({ error }) => {
				toast.show({
					children: error.message,
					color: 'negative',
				});
			}); //*/
	};
	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
			<TextField
				label="Название категории"
				placeholder="Зарплата/Магазин"
				name="label"
				variant="filled"
				error={!!errors?.label?.message}
				helperText={errors?.label?.message || ' '}
				{...register('label', { required: true })}
			/>

			<FormControl variant="filled">
				<InputLabel id="select-filled-label">Доход/Расход</InputLabel>
				<Select
					labelId="select-filled-label"
					id="demo-simple-select-filled"
					{...register('type', { required: true })}
					disabled={!!id}
				>
					<MenuItem value={undefined}>
						<em>Доход/Расход</em>
					</MenuItem>
					<MenuItem value="ncome">
						<em>Доход</em>
					</MenuItem>
					<MenuItem value="expense">
						<em>Расход</em>
					</MenuItem>
					{/*Object.entries(types).map(([value, label]) => (
						<MenuItem key={value} value={value}>
							{label}
						</MenuItem>
					))*/}
				</Select>
			</FormControl>

			<Stack direction="row" justifyContent="center" spacing={2}>
				<LoadingButton
					loading={isLoading}
					color="success"
					type="submit"
					variant="contained"
				>
					{isLoading ? 'Сохранятся...' : id ? 'Сохранить' : 'Создать'}
				</LoadingButton>
				<Button
					color="secondary"
					disabled={isLoading}
					onClick={() => navigate(-1)}
					variant="contained"
				>
					{isLoading ? 'Сохранятся...' : 'Назад'}
				</Button>
			</Stack>
		</form>
	);
};
