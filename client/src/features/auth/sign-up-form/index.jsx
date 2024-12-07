import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { registerUser } from '../../../entites/auth/authSlice';

import { XBtn, XInput } from '../../../shared/ui';

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
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
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
			.catch((err) => console.log(err));
	};
	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
			<XInput
				label="Име"
				placeholder="Ваше имя"
				name="username"
				field
				hideHint
				hint="Введите username"
				errorMessage={errors?.username?.message}
				{...register('username', { required: true })}
			/>
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
			<XInput
				label="Re Password"
				placeholder="Repeat password"
				name="re_password"
				type="password"
				field
				hideHint
				hint="Повторите пароль"
				errorMessage={errors?.re_password?.message}
				{...register('re_password', { required: true })}
			/>
			<div className="text-center">
				<XBtn color="primary" type="submit">
					{isLoading ? 'Loading...' : 'Зарегистрироваться'}
				</XBtn>
			</div>
		</form>
	);
};
