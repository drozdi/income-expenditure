import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteCategory,
	getCategories,
	getLoading,
} from '../../entites/accounts/accountsSlice';
import { getOperations } from '../../entites/operations/operationsSlice';
import localStorageService from '../../shared/services/localStorage.service';
import { XBtn, XItem, XItemLabel, XItemSection, XList } from '../../shared/ui';
import { Loader } from '../loader';
import { useToast } from '../toast';

export default function ({ accountId }) {
	const dispatch = useDispatch();
	const categories = useSelector(getCategories(accountId));
	const isLoading = useSelector(getLoading);
	const userId = localStorageService.getUserId();
	const toast = useToast();
	const operations = useSelector(getOperations);

	const groups = useMemo(() => {
		const res = [];
		for (const operation of operations) {
			res.push(categories.filter((category) => category.operation === operation));
		}
		return res;
	}, [categories, operations]);

	const handlerDelete = async (account, id, label) => {
		if (confirm(`Удалить категорию "${label}"?`)) {
			dispatch(deleteCategory({ account, id }))
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
			<div className="flex">
				{operations.map((operation, i) => (
					<XList className="flex-1" key={i} dense>
						<XItemLabel overline header>
							{operation}
						</XItemLabel>
						{groups[i].map((category) => (
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
												handlerDelete(
													category.account,
													category._id,
													category.label,
												)
											}
											icon="mdi-delete-alert"
											title="Удалить"
										/>
									</XBtn.Group>
								</XItemSection>
							</XItem>
						))}
					</XList>
				))}
			</div>
		</>
	);
}
