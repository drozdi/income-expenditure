import classNames from 'classnames';
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
		onClick = () => {},
		onChange = () => {},
		value,
		...props
	} = params;

	const [current, setCurrent] = useState(value ?? (multiple ? [] : undefined));

	const handleClick = useCallback(
		(e, value) => {
			onClick(e, value);
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
	useEffect(() => onChange(current), [current]);

	const context = {
		...props,
		selected,
		multiple,
		current,
		onClick: handleClick,
	};
	return (
		<div
			className={classNames('x-btn-group', className, {
				'x-btn-group--vertical': vertical,
				'x-btn-group--separator': separator,
				'x-btn-group--round': props.round,
			})}
		>
			<XBtnGroupContext.Provider value={context}>
				{children}
			</XBtnGroupContext.Provider>
		</div>
	);
}
