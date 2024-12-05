import classNames from 'classnames';
import { XItem, XItemSection, XList } from '../../shared/ui';
export function Sidebar({ className }) {
	return (
		<aside className={classNames('relative bg-sidebar shadow-xl', className)}>
			<XList>
				<XItem to="/">
					<XItemSection>Главная</XItemSection>
				</XItem>
				<XItem to="/categories">
					<XItemSection>Категории</XItemSection>
				</XItem>
			</XList>
		</aside>
	);
}
