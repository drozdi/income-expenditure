import { useDispatch, useSelector } from 'react-redux';
import {
	deleteAccount,
	getAccounts,
	getLoading,
} from '../../entites/accounts/accountsSlice';
import localStorageService from '../../shared/services/localStorage.service';
import { XBtn, XItem, XItemLabel, XItemSection, XList } from '../../shared/ui';
import { Loader } from '../loader';
import { useToast } from '../toast';
export default () => {
	const dispatch = useDispatch();
	const accounts = useSelector(getAccounts);
	const isLoading = useSelector(getLoading);
	const userId = localStorageService.getUserId();
	const toast = useToast();
	const onDelete = async (id, label) => {
		if (confirm(`Удалить счет "${label}"?`)) {
			dispatch(deleteAccount(id))
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
	if (!accounts.length) {
		return (
			<div className="text-center">Нет активных счетов. Добавьте новый счёт.</div>
		);
	}
	return (
		<>
			<XList>
				{accounts.map((account) => (
					<XItem key={account._id}>
						<XItemSection>
							<XItemLabel>{account.label}</XItemLabel>
						</XItemSection>
						<XItemSection>
							<XItemLabel>
								{account?.owner?._id === userId
									? 'Мой'
									: account.owner.name}
							</XItemLabel>
						</XItemSection>
						<XItemSection side>
							<XItemLabel>
								{(account.balance || 0).toLocaleString('ru-RU', {
									style: 'currency',
									currency: 'RUB',
								})}
							</XItemLabel>
						</XItemSection>
						<XItemSection side>
							<XBtn.Group>
								{account?.owner?._id === userId && (
									<XBtn
										to={`/account/${account._id}`}
										icon="mdi-file-edit-outline"
										title="Редактировать"
									/>
								)}
								<XBtn
									onClick={() => onDelete(account._id, account.label)}
									icon="mdi-delete-alert"
									title="Удалить"
								/>
							</XBtn.Group>
						</XItemSection>
					</XItem>
				))}
			</XList>
			<Loader isActive={isLoading} />
		</>
	);
};
