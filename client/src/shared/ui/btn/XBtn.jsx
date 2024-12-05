import classNames from 'classnames';
import PropTypes from 'prop-types';
import { forwardRef, memo, useMemo } from 'react';
import { useBtn } from '../../hooks/useBtn';
import { XIcon } from '../icon';
import { useXBtnGroupContext, XBtnGroup } from './Group';
import './style.scss';

const XBtnRoot = forwardRef(function XBtn(params = {}, ref) {
	const props = useXBtnGroupContext(params);
	const { children, className, active, icon, iconRight, color, size } = props;

	const { isSelected, attrs, TagProp, isLink } = useBtn({ ...props, ref });

	const isIcon = useMemo(
		() =>
			(!!icon != !!iconRight && !children) ||
			(children?.type === XIcon && !icon && !iconRight),
		[children, icon, iconRight],
	);
	const selected = useMemo(() => active || isSelected, [isSelected, active]);

	return (
		<TagProp
			{...attrs}
			className={classNames(
				'x-btn',
				{
					'x-btn--flat': props.flat || props.link,
					'x-btn--text': props.text,
					'x-btn--tonal': props.tonal,
					'x-btn--plain': props.plain,
					'x-btn--outline': props.outline,
					'x-btn--block': props.block,
					'x-btn--square': props.square,
					'x-btn--round': props.round,
					'x-btn--rounded': props.rounded,
					'x-btn--dimmed': props.dimmed,
					'x-btn--link': props.link || isLink,
					'x-btn--icon': isIcon,
					'x-btn--active': selected,
					[`x-btn--${color}`]: color,
					[`x-btn--${size}`]: size,
				},
				className,
			)}
		>
			<div className="x-btn-outline"></div>
			<div className="x-btn-backdor"></div>
			{icon && <XIcon className={!isIcon && '-ml-2 mr-2'}>{icon}</XIcon>}
			{children && <span className="x-btn-content">{children}</span>}
			{iconRight && <XIcon className={!isIcon && 'ml-2 -mr-2'}>{iconRight}</XIcon>}
		</TagProp>
	);
});

XBtnRoot.defaultProps = {
	LinkComponent: 'a',
	target: '_self',
};
XBtnRoot.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.string]),
	className: PropTypes.string,
	dimmed: PropTypes.bool,
	flat: PropTypes.bool,
	text: PropTypes.bool,
	tonal: PropTypes.bool,
	plain: PropTypes.bool,
	outline: PropTypes.bool,

	round: PropTypes.bool,
	block: PropTypes.bool,
	square: PropTypes.bool,
	rounded: PropTypes.bool,
	disabled: PropTypes.bool,
	active: PropTypes.bool,
	link: PropTypes.bool,

	icon: PropTypes.string,
	iconRight: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.PropTypes.string,
	onClick: PropTypes.func,

	value: PropTypes.any,
	LinkComponent: PropTypes.any,
	target: PropTypes.string,
	to: PropTypes.any,
	href: PropTypes.any,
}; //*/

export const XBtn = memo(XBtnRoot);

XBtn.Group = XBtnGroup;
