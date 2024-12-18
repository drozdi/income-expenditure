import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOperations } from '../../entites/operations/operationsSlice';
import CategoriesList from '../../features/categories/list';
import CategoryAddBtn from '../../features/category/add';
import { XBtn } from '../../shared/ui';
export function CategoriesPage() {
	const { accountId } = useParams();
	const operations = useSelector(getOperations);
	const [currentOperation, setCurrentOperation] = useState(operations[0]);
	useEffect(() => setCurrentOperation(operations[0]), [operations]);
	return (
		<>
			{operations.length && (
				<XBtn.Group
					className="flex justify-center"
					value={currentOperation}
					onClick={setCurrentOperation}
				>
					{operations.map((operation) => (
						<XBtn
							key={operation}
							value={operation}
							active={currentOperation === operation}
						>
							{operation}
						</XBtn>
					))}
				</XBtn.Group>
			)}
			<CategoriesList accountId={accountId} operation={currentOperation} />
			<CategoryAddBtn
				accountId={accountId}
				operation={currentOperation}
				className="float-end"
			/>
		</>
	);
}
