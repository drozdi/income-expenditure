import { Button, Dialog, DialogActions, DialogContent, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { getCategories, getTypes } from '../../entites/categories/categoriesSlice';

const categogySchema = yup.object().shape({
	label: yup.string().required('Заполните название'),
});

export default function ({ id, account, type, onSave, onClose }) {
	const dispatch = useDispatch();
	const types = useSelector(getTypes);
	const categories = useSelector(getCategories(accountId)) || [];
	const category = categories.find((t) => t._id === id);
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
		<Dialog fullWidth open={open} onClose={() => onClose()}>
			<DialogTitle>Custom Error Handler</DialogTitle>
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
				<Button onClick={() => onClose()}>Close me</Button>
			</DialogActions>
		</Dialog>
	);
}
