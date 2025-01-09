import { yupResolver } from '@hookform/resolvers/yup';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Stack, TextField } from '@mui/material';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { loginUser, selectLoading } from '../../entites/auth/authSlice';

const loginFormSchema = yup.object().shape({
	email: yup.string().email('Введите корректный email').required('Заполните логин'),
	password: yup.string().required('Заполните пароль'),
});

export default () => {
	const notifications = useNotifications();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoading = useSelector(selectLoading);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(loginFormSchema),
	});

	const onSubmit = (data) => {
		dispatch(loginUser(data))
			.unwrap()
			.then(() => {
				navigate('/');
			})
			.catch(({ error, message }) => {
				notifications.show(error ?? message, {
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
				id="sign-in-email"
				label="Email"
				placeholder="Email"
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
				{...register('password', { required: true })}
			/>
			<Stack direction="row" justifyContent="center" spacing={2}>
				<LoadingButton
					loading={isLoading}
					loadingPosition="start"
					startIcon={<LoginIcon />}
					color="success"
					type="submit"
					variant="contained"
				>
					{isLoading ? 'Вход...' : 'Войти'}
				</LoadingButton>
				<Button component={Link} to="/auth/signUp" disabled={isLoading}>
					Регистрация
				</Button>
			</Stack>
		</Stack>
	);
};
