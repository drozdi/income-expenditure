import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteCategory,
	getCategories,
	getLoading,
} from '../../entites/categories/categoriesSlice';
import { getOperations } from '../../entites/operations/operationsSlice';
import localStorageService from '../../shared/services/localStorage.service';
import { XBtn, XItem, XItemLabel, XItemSection, XList } from '../../shared/ui';
import { Loader } from '../loader';
import { useToast } from '../toast';

export default function ({ accountId, operation }) {
	const dispatch = useDispatch();
	const operations = useSelector(getOperations);
	const isLoading = useSelector(getLoading);
	const categories = useSelector(getCategories(accountId)) || [];
	const userId = localStorageService.getUserId();
	const toast = useToast();

	const grouped = useMemo(() => {
		return categories.filter((category) => category.operation === operation);
	}, [categories, operation]);

	const handlerDelete = async (id, label) => {
		if (confirm(`Удалить категорию "${label}"?`)) {
			dispatch(deleteCategory({ id }))
				.unwrap()
				.then((data) => {
					toast.show({
						children: 'Удалено',
						color: 'positive',
					});
				})
				.catch(({ error }) => {
					toast.show({
						children: error,
						color: 'negative',
					});
				});
		}
	};

	if (!categories.length) {
		return (
			<div className="text-center">Нет категорий. Добавьте новую категорию.</div>
		);
	}
	return (
		<>
			<Loader isActive={isLoading} />
			<XList dense>
				{grouped.map((category) => (
					<XItem key={category._id}>
						<XItemSection>
							<XItemLabel>{category.label}</XItemLabel>
						</XItemSection>
						<XItemSection side>
							<XBtn.Group>
								<XBtn
									to={`/account/${category.account}/category/${category._id}`}
									icon="mdi-file-edit-outline"
									title="Редактировать"
								/>
								<XBtn
									onClick={() =>
										handlerDelete(category._id, category.label)
									}
									icon="mdi-delete-alert"
									title="Удалить"
								/>
							</XBtn.Group>
						</XItemSection>
					</XItem>
				))}
			</XList>
		</>
	);
}
