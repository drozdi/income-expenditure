import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAll } from './categoriesSlice';
export function useMapCategories() {
	const all = useSelector(selectAll);
	return useMemo(() => {
		const maps = {};
		Object.entries(all).forEach(([key, categories]) => {
			maps[key] = {};
			categories?.forEach((category) => {
				maps[key][category._id] = category.label;
			});
		});
		return maps;
	}, [all]);
}
