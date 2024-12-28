import { yupResolver } from '@hookform/resolvers/yup';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { saveAccount, selectAccount } from '../../entites/accounts/accountsSlice';

import { useEffect } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Stack, TextField } from '@mui/material';

const accountSchema = yup.object().shape({
	label: yup.string().required('Заполните название'),
	balance: yup.number().required('Заполните сумму'),
});

export default ({ id, onSave }) => {
	const notifications = useNotifications();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const account = useSelector(selectAccount(id));

	const {
		register,
		handleSubmit,
		reset,
		formState: { isLoading, errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			_id: id,
			label: '',
			balance: 0.0,
		},
		resolver: yupResolver(accountSchema),
	});

	useEffect(() => {
		account && reset(account);
	}, [account]);

	const onSubmit = async (data) => {
		dispatch(saveAccount(data))
			.unwrap()
			.then((data) => {
				notifications.show(`Сохранено!`, {
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
				label="Название счета"
				placeholder="Заначка"
				name="label"
				variant="filled"
				error={!!errors?.label?.message}
				helperText={errors?.label?.message || ' '}
				{...register('label', { required: true })}
			/>
			<TextField
				label="Сумма"
				placeholder="0.00"
				type="number"
				name="balance"
				step="0.01"
				disabled={!!id}
				variant="filled"
				error={!!errors?.balance?.message}
				helperText={errors?.balance?.message || ' '}
				{...register('balance', { required: true })}
			/>

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
		</Stack>
	);
};
