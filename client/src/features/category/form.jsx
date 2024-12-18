import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { getCategories, saveCategory } from '../../entites/categories/categoriesSlice';
import { getOperations } from '../../entites/operations/operationsSlice';
import { XBtn, XInput } from '../../shared/ui';
import { useToast } from '../toast';

const categogySchema = yup.object().shape({
	label: yup.string().required('Заполните название'),
});

export default ({ accountId, id, onSaved }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const operations = useSelector(getOperations);
	const categories = useSelector(getCategories(accountId)) || [];
	const category = categories.find((t) => t._id === id);
	const toast = useToast();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isLoading },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			_id: id,
			account: accountId,
			label: '',
			operation: operations[0],
		},
		resolver: yupResolver(categogySchema),
	});

	useEffect(() => {
		category && reset(category);
	}, [category]);

	const onSubmit = async (data) => {
		dispatch(saveCategory(data))
			.unwrap()
			.then((data) => {
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
			<XInput
				label="Название категории"
				placeholder="Зарплата/Магазин"
				name="label"
				field
				hideHint
				hint="Введите название категории"
				errorMessage={errors?.label?.message}
				{...register('label', { required: true })}
			/>
			<div className={'x-input x-input--field' + (id ? ' x-input--disabled' : '')}>
				<div className="x-input-container">
					<div className="x-input-underlay"></div>
					<div className="x-input-control">
						<select
							{...register('operation', { required: true })}
							className="x-input-native"
							disabled={id}
						>
							{operations.map((value) => (
								<option key={value} value={value}>
									{value}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

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
