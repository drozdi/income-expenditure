import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getLoading } from '../../entites/accounts/accountsSlice';
import CategoryForm from '../../features/category/form';
import { Loader } from '../../features/loader';
import { useToast } from '../../features/toast';
export function CategoryPage() {
	const { accountId, id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const toast = useToast();
	const isLoading = useSelector(getLoading);

	return (
		<>
			<CategoryForm
				accountId={accountId}
				id={id}
				onSaved={() => navigate(`/categories/${accountId}/`)}
			/>
			<Loader isActive={isLoading} />
		</>
	);
}
