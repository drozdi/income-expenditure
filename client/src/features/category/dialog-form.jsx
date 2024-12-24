import { yupResolver } from '@hookform/resolvers/yup';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
} from '@mui/material';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { getTypes } from '../../entites/categories/categoriesSlice';
import { useToast } from '../toast';

const categogySchema = yup.object().shape({
	label: yup.string().required('Заполните название'),
});

export default function ({ open, onClose, payload: { account, type } }) {
	const dispatch = useDispatch();
	const notifications = useNotifications();
	const types = useSelector(getTypes);

	const toast = useToast();
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isLoading },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			_id: id,
			account: account,
			label: '',
			type: type,
		},
		resolver: yupResolver(categogySchema),
	});

	useEffect(() => reset(category), [reset, category]);

	const onSubmit = async (data) => {
		console.log(data);
		return;
		dispatch(saveCategory(data))
			.unwrap()
			.then((data) => {
				notifications.show('Сохранено!', {
					severity: 'success',
					autoHideDuration: 3000,
				});
				onSaved?.(data);
			})
			.catch(({ error }) => {
				notifications.show(error.message, {
					severity: 'error',
					autoHideDuration: 3000,
				});
			}); //*/
	};
	return (
		<Dialog fullWidth open={open} onClose={() => onClose()}>
			<DialogTitle>Добавить категорию "${types[type]}"</DialogTitle>
			<DialogContent>
				<Stack
					direction="column"
					spacing={2}
					component="form"
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						label="Название категории"
						placeholder="Зарплата/Магазин"
						name="label"
						variant="filled"
						error={!!errors?.label?.message}
						helperText={errors?.label?.message || ' '}
						{...register('label', { required: true })}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => onClose()}>Закрыть</Button>
			</DialogActions>
		</Dialog>
	);
}
