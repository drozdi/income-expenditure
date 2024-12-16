import { useParams } from 'react-router-dom';
import CategoriesList from '../../features/categories/list';
import CategoryAddBtn from '../../features/category/add';
export function CategoriesPage() {
	const { accountId } = useParams();
	return (
		<>
			<CategoriesList accountId={accountId} />
			<CategoryAddBtn accountId={accountId} className="float-end" />
		</>
	);
}
