import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { XAccordionContext } from './XAccordionContext';
export function XAccordion({
	children,
	className,
	multiple,
	border,
	field,
	square,
	separated,
	onChange,
	value,
}) {
	const [current, setCurrent] = useState(
		multiple && Array.isArray(value)
			? value
			: multiple && value
				? [value]
				: (value ?? (multiple ? [] : undefined)),
	);
	const context = {
		isItemActive: (value) =>
			multiple ? current?.includes(value) : value === current,
		onChange: (value) => {
			if (multiple) {
				setCurrent((current) => {
					if (!current.includes(value)) return [...current, value];
					return current.filter((v) => v !== value);
				});
			} else {
				setCurrent((v) => (v === value ? undefined : value));
			}
		},
	};
	useEffect(() => {
		if (Array.isArray(current) && !multiple) {
			setCurrent(current[0] ?? undefined);
		} else if (!Array.isArray(current) && multiple) {
			setCurrent(current ? [current] : []);
		}
	}, [multiple]);
	useEffect(() => onChange?.(current), [current]);
	return (
		<div
			className={classNames('x-accordion', className, {
				'x-accordion--border': border,
				'x-accordion--field': field,
				'x-accordion--square': square,
				'x-accordion--separated': separated,
			})}
		>
			<XAccordionContext.Provider value={context}>
				{children}
			</XAccordionContext.Provider>
		</div>
	);
}

XAccordion.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.array, PropTypes.string]),
	multiple: PropTypes.bool,
	border: PropTypes.bool,
	field: PropTypes.bool,
	square: PropTypes.bool,
	separated: PropTypes.bool,
	onChange: PropTypes.bool,
};
