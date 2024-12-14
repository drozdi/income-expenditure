import classNames from 'classnames';
import { PropTypes } from 'prop-types';
import './style.css';
export function XCardActions({
	tag = 'div',
	children,
	className,
	horizontal = false,
	align,
}) {
	const Tag = tag;
	return (
		<Tag
			className={classNames('x-card__actions', className, {
				'x-card__actions--horizontal': horizontal,
				[`justify-` + align]: horizontal && align,
				[`items-` + align]: !horizontal && align,
			})}
		>
			{children}
		</Tag>
	);
}

XCardActions.propTypes = {
	tag: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	horizontal: PropTypes.bool,
	align: PropTypes.oneOf(['start', 'center', 'end']),
};
