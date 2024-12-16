import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {
	getCategory,
	getLoading,
	saveAccount,
} from '../../entites/accounts/accountsSlice';
import { XBtn, XInput } from '../../shared/ui';
import { useToast } from '../toast';

const categogySchema = yup.object().shape({
	label: yup.string().required('Заполните название'),
});

export default ({ accountId, id }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const toast = useToast();
	const isLoading = useSelector(getLoading);
	const category = useSelector(getCategory(accountId, id)) ?? {
		_id: id,
		account: accountId,
		label: '',
		operation: '',
	};

	console.log(category);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			_id: category._id,
			label: category.label,
			account: category.account,
			operation: category.operation,
		},
		resolver: yupResolver(categogySchema),
	});

	const onSubmit = async (data) => {
		dispatch(saveAccount(data))
			.unwrap()
			.then((data) => {
				toast.show({
					children: 'Сохранено',
					color: 'positive',
				});
				navigate(`/categories/${accountId}/`);
			})
			.catch(({ error }) => {
				toast.show({
					children: error.message,
					color: 'negative',
				});
			});
	};
	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
			<div className="text-center">
				<XBtn color="primary" type="submit">
					{isLoading ? 'Loading...' : id ? 'Сохранить' : 'Создать'}
				</XBtn>
			</div>
		</form>
	);
};
