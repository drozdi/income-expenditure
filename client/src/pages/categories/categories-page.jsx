import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTypes } from '../../entites/categories/categoriesSlice';
import BackBtn from '../../features/btnBack';
import CategoriesList from '../../features/categories/list';
import CategoriesListAccount from '../../features/categories/list-account';
import CategoryAddBtn from '../../features/category/add';
import { XBtn } from '../../shared/ui';
export function CategoriesPage() {
	const { accountId } = useParams();
	const types = useSelector(getTypes);
	const [currentType, setCurrentType] = useState(Object.entries(types)?.[0]?.[0]);
	useEffect(() => setCurrentType(Object.entries(types)?.[0]?.[0]), [types]);
	return accountId ? (
		<>
			{types && (
				<XBtn.Group
					className="mb-4"
					spread
					switchable
					value={currentType}
					onChange={setCurrentType}
				>
					{Object.entries(types).map(([value, label]) => (
						<XBtn key={value} value={value}>
							{label}
						</XBtn>
					))}
				</XBtn.Group>
			)}
			<CategoriesList className="mb-4" accountId={accountId} type={currentType} />
			<BackBtn className="float-end" />
			<CategoryAddBtn
				accountId={accountId}
				type={currentType}
				className="float-star"
			/>
		</>
	) : (
		<CategoriesListAccount />
	);
}
