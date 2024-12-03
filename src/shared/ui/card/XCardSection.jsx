import classNames from 'classnames';
import { PropTypes } from 'prop-types';
import './style.scss';

export function XCardSection({ tag = 'div', children, className, horizontal = false }) {
	const Tag = tag;
	return (
		<Tag
			className={classNames('x-card__section', className, {
				'x-card__section--horizontal': horizontal,
			})}
		>
			{children}
		</Tag>
	);
}

XCardSection.propTypes = {
	tag: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	horizontal: PropTypes.bool,
};
