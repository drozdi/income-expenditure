import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getLoading } from '../../entites/accounts/accountsSlice';
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

	if (!categories.length) {
		return (
			<div className="text-center">Нет категорий. Добавьте новую категорию.</div>
		);
	}
	return (
		<>
			<XList>
				{categories.map((category) => (
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

								<XBtn icon="mdi-delete-alert" title="Удалить" />
							</XBtn.Group>
						</XItemSection>
					</XItem>
				))}
			</XList>
			<Loader isActive={isLoading} />
		</>
	);
}
