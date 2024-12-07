import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { loginUser } from '../../../entites/auth/authSlice';

import { XBtn, XInput } from '../../../shared/ui';

const loginFormSchema = yup.object().shape({
	email: yup.string().email('Введите корректный email').required('Заполните логин'),
	password: yup.string().required('Заполните пароль'),
});

export default () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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
			});
	};
	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
			<XInput
				label="Email"
				placeholder="Email"
				name="email"
				field
				hideHint
				hint="Введите email"
				errorMessage={errors?.email?.message}
				{...register('email', { required: true })}
			/>
			<XInput
				label="Password"
				placeholder="Password"
				name="password"
				type="password"
				field
				hideHint
				hint="Введите пароль"
				errorMessage={errors?.password?.message}
				{...register('password', { required: true })}
			/>
			<div className="text-center">
				<XBtn color="primary" type="submit">
					Ввойти
				</XBtn>
				<XBtn text flat to="/auth/signUp">
					Регистрация
				</XBtn>
			</div>
		</form>
	);
};
