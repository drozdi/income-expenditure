import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { saveUser, selectUser } from '../../entites/settings/settingsSlice';

import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Stack, TextField } from '@mui/material';
import { useDialogs } from '@toolpad/core/useDialogs';
import { useNotifications } from '@toolpad/core/useNotifications';

import * as yup from 'yup';

const userFormSchema = yup.object().shape({
	username: yup
		.string()
		.required('Заполните логин')
		.matches(/^[\wа-яА-Я]+$/, 'Неверный логин. Допускаются буквы и цифры')
		.min(3, 'Неверный логин. Минимум 3 символа')
		.max(15, 'Неверный логин. Максимум 15 символов'),
	email: yup.string().email('Введите корректный email').required('Заполните логин'),
	password: yup.lazy((value) => {
		if (value) {
			return yup
				.string()
				.required('Заполните пароль')
				.matches(
					/^[\w#%]+$/,
					'Неверно заполнен пароль. Допускаются буквы, цифры и знаки "# и %"',
				)
				.min(6, 'Неверный пароль. Минимум 6 символа')
				.max(30, 'Неверный пароль. Максимум 30 символов');
		}
		return yup.string();
	}),

	re_password: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Повтор пароля не совпадает'),
});

export default function SettingsForm({ onSaved }) {
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
		defaultValues: {
			username: user.username,
			email: user.email,
			password: '',
			re_password: '',
		},
		resolver: yupResolver(userFormSchema),
	});
	const onSubmit = async (data) => {
		dispatch(saveUser(data))
			.unwrap()
			.then(({ payload }) => {
				notifications.show(`Успешно обновлено!`, {
					severity: 'success',
					autoHideDuration: 3000,
				});
				onSaved?.(payload);
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
			<TextField
				id="sign-in-password"
				label="Password"
				placeholder="Password"
				type="password"
				variant="filled"
				error={!!errors?.password?.message}
				helperText={errors?.password?.message || ' '}
				{...register('password')}
			/>
			<TextField
				id="sign-in-re-password"
				label="Re Password"
				placeholder="Repeat password"
				type="password"
				variant="filled"
				error={!!errors?.re_password?.message}
				helperText={errors?.re_password?.message || ' '}
				{...register('re_password')}
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
}

SettingsForm.propTypes = {
	onSaved: PropTypes.func,
};
