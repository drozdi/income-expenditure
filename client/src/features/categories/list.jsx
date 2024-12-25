import { List, ListSubheader } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../entites/categories/categoriesSlice';

import AddCategoryItem from './add-item';
import CategoryItem from './item';

export default function ({ className, account, type }) {
	const categories = useSelector(selectCategories(account)) || [];
	const grouped = useMemo(() => {
		return categories.filter((category) => category.type === type);
	}, [categories, type]);

	return (
		<List className={className}>
			<AddCategoryItem account={account} type={type} />
			{!categories.length && (
				<ListSubheader>Нет категорий. Добавьте новую категорию.</ListSubheader>
			)}
			{grouped.map((category) => (
				<CategoryItem key={category._id} category={category} />
			))}
		</List>
	);
}
