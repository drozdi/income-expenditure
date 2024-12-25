//expense: 'Расход', income: 'Доход', transfer: 'Перевод'
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';

import { addTransaction, selectAccounts } from '../../entites/accounts/accountsSlice';
import { selectCategories, selectTypes } from '../../entites/categories/categoriesSlice';
import { saveTransaction } from '../../entites/transactions/transactionsSlice';
import { XBtn, XInput } from '../../shared/ui';
import { useToast } from '../toast';

const transactionSchema = yup.object().shape({
	account: yup.string().required('Выберите счет!'),
	type: yup.string().oneOf(['income', 'expense', 'transfer']).required(),
	category: yup.string().required('Выберите категорию!'),
	comment: yup.string(),
	amount: yup
		.number()
		.positive('Сумма должна быть положительной')
		.required('Поле обязательно'),
	//date: { type: Date, default: Date.now },
});

export default ({ id, onSaved }) => {
	const {
		register,
		watch,
		reset,
		handleSubmit,
		formState: { errors, isLoading },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			_id: '',
			account: '',
			category: '',
			type: '',
			comment: '',
			amount: '',
		},
		resolver: yupResolver(transactionSchema),
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const accounts = useSelector(selectAccounts);
	const types = useSelector(selectTypes);

	const type = watch('type');
	const accountId = watch('account');

	const categories = useSelector(selectCategories(accountId)) || [];
	const grouped = useMemo(
		() => categories.filter((c) => c.type === type),
		[categories, type],
	);

	const toast = useToast();
	const [searchParams, setSearchParams] = useSearchParams();

	/*useEffect(() => {
		category && reset(category);
	}, [category]);*/

	const onSubmit = async (data) => {
		dispatch(saveTransaction(data))
			.unwrap()
			.then((data) => {
				dispatch(addTransaction(data));
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
		<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
			<select
				{...register('account', { required: true })}
				className="border border-color p-3 bg-dimmed"
			>
				<option value="" disabled>
					Выберите счет
				</option>
				{accounts.map(({ _id, label }) => (
					<option key={_id} value={_id}>
						{label}
					</option>
				))}
			</select>

			<select
				{...register('type', { required: true })}
				className="border border-color p-3 bg-dimmed"
				disabled={!accountId}
			>
				<option value="">Выберите тип операции</option>
				{Object.entries(types).map(([value, label]) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>

			<select
				{...register('category', { required: true })}
				className="border border-color p-3 bg-dimmed"
				disabled={!type}
			>
				<option value="">Выберите категорию</option>
				{grouped.map(({ _id, label }) => (
					<option key={_id} value={_id}>
						{label}
					</option>
				))}
			</select>

			<XInput
				label="Сумма"
				placeholder="0.00"
				name="amount"
				field
				type="number"
				step="0.01"
				hideHint
				hint="Введите сумму операция"
				errorMessage={errors?.amount?.message}
				{...register('amount', { required: true })}
			/>

			<XInput
				label="Коментарий"
				placeholder="Коментарий"
				name="comment"
				field
				type="textarea"
				rows="4"
				hideHint
				hint="Введите сумму операция"
				errorMessage={errors?.comment?.message}
				{...register('comment')}
			/>

			<div className="flex gap-4 justify-center">
				<XBtn color="primary" type="submit">
					{isLoading ? 'Loading...' : id ? 'Сохранить' : 'Создать'}
				</XBtn>
				<XBtn color="secondary" disabled={isLoading} onClick={() => navigate(-1)}>
					{isLoading ? 'Loading...' : 'Назад'}
				</XBtn>
			</div>
		</form>
	);
};
