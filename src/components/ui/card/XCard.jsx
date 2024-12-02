import classNames from 'classnames';
import { PropTypes } from 'prop-types';
import './style.scss';

export function XCard({
	tag = 'div',
	children,
	className,
	border = false,
	flat = false,
	square = false,
}) {
	const Tag = tag;
	return (
		<Tag
			className={classNames('x-card x-bg-surface', className, {
				'x-card--border': border,
				'x-card--flat': flat,
				'x-card--square': square,
			})}
		>
			{children}
		</Tag>
	);
}

XCard.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	border: PropTypes.bool,
	flat: PropTypes.bool,
	square: PropTypes.bool,
};
