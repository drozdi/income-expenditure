import { useDispatch, useSelector } from 'react-redux';
import { getAccounts } from '../../entites/accounts/accountsSlice';
import { XItem, XItemLabel, XItemSection, XList } from '../../shared/ui';
import { useToast } from '../toast';

export default function ({ className }) {
	const dispatch = useDispatch();
	const toast = useToast();
	const accounts = useSelector(getAccounts);

	return (
		<XList className={className}>
			<XItemLabel>Категории счетов</XItemLabel>
			{accounts.map((account) => (
				<XItem key={account._id} to={`/categories/${account._id}`}>
					<XItemSection>
						<XItemLabel>{account.label}</XItemLabel>
					</XItemSection>
					<XItemSection side>
						<XItemLabel>
							{(account.balance || 0).toLocaleString('ru-RU', {
								style: 'currency',
								currency: 'RUB',
							})}
						</XItemLabel>
					</XItemSection>
				</XItem>
			))}
		</XList>
	);
}
