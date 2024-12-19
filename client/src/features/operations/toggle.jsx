import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getOperations } from '../../entites/operations/operationsSlice';
import { XBtn } from '../../shared/ui';
export default function () {
	const operations = useSelector(getOperations);
	const [currentOperation, setCurrentOperation] = useState(operations[0]);

	return (
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
	);
}
