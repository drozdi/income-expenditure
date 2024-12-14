import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { startLoader, stopLoader } from '../../entites/loader/loaderSlice';
import { getLoading } from '../../entites/source/sourceSlice';
import { XBtn, XInput } from '../../shared/ui';
import { useToast } from '../toast';

const regFormSchema = yup.object().shape({
	label: yup.string().required('Заполните название'),
	total: yup.number().required('Заполните сумму'),
});

export default () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const toast = useToast();
	const isLoading = useSelector(getLoading);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			label: '',
			total: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const onSubmit = async (data) => {
		console.log(data);
		dispatch(startLoader());
		dispatch(stopLoader());
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
				name="total"
				step="0.01"
				field
				hideHint
				hint="Введите начальную сумму счета"
				errorMessage={errors?.total?.message}
				{...register('total', { required: true })}
			/>
			<div className="text-center">
				<XBtn color="primary" type="submit">
					{isLoading ? 'Loading...' : 'Зарегистрироваться'}
				</XBtn>
			</div>
		</form>
	);
};
