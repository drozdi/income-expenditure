import { yupResolver } from '@hookform/resolvers/yup';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { getIsLoading, registerUser } from '../../entites/auth/authSlice';
import { useToast } from '../toast';

const regFormSchema = yup.object().shape({
	username: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверный логин. Допускаются буквы и цифры')
		.min(3, 'Неверный логин. Минимум 3 символа')
		.max(15, 'Неверный логин. Максимум 15 символов'),
	email: yup.string().email('Введите корректный email').required('Заполните логин'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки "# и %"',
		)
		.min(6, 'Неверный пароль. Минимум 6 символа')
		.max(30, 'Неверный пароль. Максимум 30 символов'),
	re_password: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Повтор пароля не совпадает'),
});

export default () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const toast = useToast();
	const isLoading = useSelector(getIsLoading);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			username: '',
			email: '',
			password: '',
			re_password: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const onSubmit = async (data) => {
		dispatch(registerUser(data))
			.unwrap()
			.then(() => {
				navigate('/');
			})
			.catch(({ error }) => {
				toast.show({
					children: error.message,
					color: 'negative',
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
				id="sign-in-username"
				label="Имя"
				placeholder="Ваше имя"
				variant="filled"
				error={!!errors?.username?.message}
				helperText={errors?.username?.message || ' '}
				{...register('username', { required: true })}
			/>
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
			<TextField
				id="sign-in-re-password"
				label="Re Password"
				placeholder="Repeat password"
				type="password"
				variant="filled"
				error={!!errors?.re_password?.message}
				helperText={errors?.re_password?.message || ' '}
				{...register('re_password', { required: true })}
			/>

			<Stack direction="row" justifyContent="center" spacing={2}>
				<LoadingButton
					loading={isLoading}
					loadingPosition="start"
					startIcon={<SaveIcon />}
					variant="contained"
					color="success"
					type="submit"
				>
					{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
				</LoadingButton>
			</Stack>
		</Stack>
	);
};
