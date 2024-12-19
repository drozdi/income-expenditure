import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOperations } from '../../entites/operations/operationsSlice';
import BackBtn from '../../features/btnBack';
import CategoriesList from '../../features/categories/list';
import CategoriesListAccount from '../../features/categories/list-account';
import CategoryAddBtn from '../../features/category/add';
import { XBtn } from '../../shared/ui';
export function CategoriesPage() {
	const { accountId } = useParams();
	const operations = useSelector(getOperations);
	const [currentOperation, setCurrentOperation] = useState(operations[0]);
	useEffect(() => setCurrentOperation(operations[0]), [operations]);
	return accountId ? (
		<>
			{operations.length && (
				<XBtn.Group
					spread
					switchable
					value={currentOperation}
					onChange={setCurrentOperation}
				>
					{operations.map((operation) => (
						<XBtn key={operation} value={operation}>
							{operation}
						</XBtn>
					))}
				</XBtn.Group>
			)}
			<CategoriesList accountId={accountId} operation={currentOperation} />
			<BackBtn className="float-end" />
			<CategoryAddBtn
				accountId={accountId}
				operation={currentOperation}
				className="float-star"
			/>
		</>
	) : (
		<CategoriesListAccount />
	);
}
