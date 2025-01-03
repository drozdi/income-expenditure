import { Button, ButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectTypes } from '../../entites/categories/categoriesSlice';
import AccountCategoriesList from '../../features/categories/accounts';
import CategoriesList from '../../features/categories/list';

export function CategoriesPage() {
	const { accountId } = useParams();
	const types = useSelector(selectTypes);
	const [currentType, setCurrentType] = useState(Object.entries(types)?.[0]?.[0]);
	useEffect(() => setCurrentType(Object.entries(types)?.[0]?.[0]), [types]);
	return accountId ? (
		<>
			{types && (
				<ButtonGroup fullWidth value={currentType} onChange={setCurrentType}>
					{Object.entries(types).map(([value, label]) => (
						<Button
							variant={currentType === value ? 'contained' : ''}
							key={value}
							value={value}
							onClick={() => setCurrentType(value)}
						>
							{label}
						</Button>
					))}
				</ButtonGroup>
			)}
			<CategoriesList account={accountId} type={currentType} />
		</>
	) : (
		<AccountCategoriesList />
	);
}
