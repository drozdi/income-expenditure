import classNames from 'classnames';
import { XItem, XItemSection, XList } from '../../shared/ui';
export function Sidebar({ className }) {
	return (
		<aside className={classNames('relative bg-sidebar shadow-xl', className)}>
			<XList>
				<XItem to="/">
					<XItemSection>Главная</XItemSection>
				</XItem>
				<XItem to="/categories/675ed9c4444bb8cd1b565d2a">
					<XItemSection>Категории</XItemSection>
				</XItem>
				<XItem to="/accounts">
					<XItemSection>Счета</XItemSection>
				</XItem>
			</XList>
		</aside>
	);
}
