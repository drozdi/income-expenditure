import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import './XBtnGroup.css';
import { XBtnGroupContext } from './XBtnGroupContext';

export function XBtnGroup(params = {}) {
	const {
		children,
		className,
		vertical,
		selected,
		multiple,
		separator,
		onClick,
		onChange,
		value,
		align,
		...props
	} = params;

	const [current, setCurrent] = useState(value ?? (multiple ? [] : undefined));

	const handleClick = useCallback(
		(value) => {
			onClick?.(value);
			if (!selected) {
				return;
			}
			if (multiple) {
				setCurrent((current) => {
					if (!current.includes(value)) return [...current, value];
					return current.filter((v) => v !== value);
				});
			} else {
				setCurrent((v) => (v === value ? undefined : value));
			}
		},
		[selected, multiple, onClick],
	);

	useEffect(() => {
		if (Array.isArray(current) && !multiple) {
			setCurrent(current[0] ?? undefined);
		} else if (!Array.isArray(current) && multiple) {
			setCurrent(current ? [current] : []);
		} else {
			setCurrent(multiple ? [] : undefined);
		}
	}, [multiple]);
	useEffect(() => {
		setCurrent(value ?? (multiple ? [] : undefined));
	}, [value]);
	useEffect(() => onChange?.(current), [current]);

	const context = {
		btnProps: props,
		selected,
		multiple,
		current,
		onChange: handleClick,
		//isDisabled: (value) => {},
		isActive: (value) => {
			if (!selected) {
				return false;
			}
			if (multiple && Array.isArray(current)) {
				return current.includes(value);
			}
			return current === value;
		},
	};
	return (
		<div
			className={classNames('x-btn-group', className, {
				'x-btn-group--vertical': vertical,
				'x-btn-group--separator': separator,
				'x-btn-group--spread': props.spread,
				'x-btn-group--round': props.round,
				[`justify-` + align]: !vertical && align,
				[`items-` + align]: vertical && align,
			})}
		>
			<XBtnGroupContext.Provider value={context}>
				{children}
			</XBtnGroupContext.Provider>
		</div>
	);
}

XBtnGroup.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	vertical: PropTypes.bool,
	selected: PropTypes.bool,
	multiple: PropTypes.bool,
	separator: PropTypes.bool,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	value: PropTypes.any,
	align: PropTypes.oneOf(['start', 'center', 'between', 'end']),
};
