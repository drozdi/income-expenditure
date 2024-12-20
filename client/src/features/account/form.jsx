import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { getAccount, saveAccount } from '../../entites/accounts/accountsSlice';

import { useEffect } from 'react';
import { XBtn, XInput } from '../../shared/ui';
import { useToast } from '../toast';

const accountSchema = yup.object().shape({
	label: yup.string().required('Заполните название'),
	balance: yup.number().required('Заполните сумму'),
});

export default ({ id, onSave }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const toast = useToast();
	const account = useSelector(getAccount(id));

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
				toast.show({
					children: 'Сохранено',
					color: 'positive',
				});
				onSave?.(data);
			})
			.catch(({ error }) => {
				toast.show({
					children: error.message,
					color: 'negative',
				});
			});
	};
	return (
		<form className="relative flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
			<XInput
				label="Название счета"
				placeholder="Заначка"
				name="label"
				field
				hideHint
				hint="Введите название счета"
				errorMessage={errors?.label?.message}
				{...register('label', { required: true })}
			/>
			<XInput
				label="Сумма"
				placeholder="0.00"
				type="number"
				name="balance"
				step="0.01"
				disabled={id}
				field
				hideHint
				hint="Введите начальную сумму счета"
				errorMessage={errors?.balance?.message}
				{...register('balance', { required: true })}
			/>
			<div className="flex gap-4 justify-center">
				<XBtn color="primary" type="submit" disabled={isLoading}>
					{isLoading ? 'Loading...' : id ? 'Сохранить' : 'Создать'}
				</XBtn>
				<XBtn color="secondary" disabled={isLoading} onClick={() => navigate(-1)}>
					{isLoading ? 'Loading...' : 'Назад'}
				</XBtn>
			</div>
		</form>
	);
};
