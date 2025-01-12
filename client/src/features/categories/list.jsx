import { List, ListSubheader } from '@mui/material';
import { useMemo } from 'react';
import { useCategories } from '../../entites/categories/hooks';

import PropTypes from 'prop-types';
import AddCategoryItem from './add-item';
import CategoryItem from './item';

export default function CategoriesList({ account, type }) {
	const categories = useCategories(account);
	const grouped = useMemo(() => {
		return categories.filter((category) => category.type === type);
	}, [categories, type]);

	return (
		<List>
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

CategoriesList.propTypes = {
	account: PropTypes.string,
	type: PropTypes.string,
};
