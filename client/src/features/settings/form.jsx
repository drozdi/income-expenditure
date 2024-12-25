import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { saveUser, selectUser } from '../../entites/settings/settingsSlice';

import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Stack, TextField } from '@mui/material';
import { useDialogs } from '@toolpad/core/useDialogs';
import { useNotifications } from '@toolpad/core/useNotifications';

export default ({ onSaved }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const dialogs = useDialogs();
	const notifications = useNotifications();

	const user = useSelector(selectUser);

	const {
		register,
		handleSubmit,
		formState: { isLoading, errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: { username: user.username, email: user.email },
	});

	const onSubmit = async (data) => {
		dispatch(saveUser(data))
			.unwrap()
			.then((data) => {
				notifications.show(`Успешно обновлено!`, {
					severity: 'success',
					autoHideDuration: 3000,
				});
				onSave?.(data);
			})
			.catch(({ error }) => {
				notifications.show(error, {
					severity: 'error',
					autoHideDuration: 3000,
				});
			});
	};
	return (
		<Stack
			direction="column"
			spacing={2}
			component="form"
			onSubmit={handleSubmit(onSubmit)}
		>
			<TextField
				label="Имя"
				placeholder="Иванов"
				name="username"
				variant="filled"
				error={!!errors?.username?.message}
				helperText={errors?.username?.message || ' '}
				{...register('username', { required: true })}
			/>
			<TextField
				label="Email"
				placeholder="email@host.ru"
				type="email"
				name="email"
				variant="filled"
				error={!!errors?.email?.message}
				helperText={errors?.email?.message || ' '}
				{...register('email', { required: true })}
			/>

			<Stack direction="row" justifyContent="center" spacing={2}>
				<LoadingButton
					loading={isLoading}
					color="success"
					type="submit"
					variant="contained"
				>
					{isLoading ? 'Обновляеться...' : 'Обновить'}
				</LoadingButton>
				<Button
					color="secondary"
					disabled={isLoading}
					onClick={() => navigate(-1)}
					variant="contained"
				>
					{isLoading ? 'Обновляеться...' : 'Назад'}
				</Button>
			</Stack>
		</Stack>
	);
};
