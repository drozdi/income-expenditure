import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAll, selectCategories } from './categoriesSlice';
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
export function useCategories(account) {
	const categories = useSelector(selectCategories(account)) || [];
	return useMemo(() => {
		return [...categories].sort((a, b) => {
			if (a?.label.toLowerCase() < b?.label.toLowerCase()) return -1;
			if (a?.label.toLowerCase() > b?.label.toLowerCase()) return 1;
			return 0;
		});
	}, [categories]);
}
