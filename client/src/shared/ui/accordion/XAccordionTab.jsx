import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './style.css';
import { useXAccordionContext } from './XAccordionContext';
export function XAccordionTab({
	className,
	children,
	header,
	disabled,
	value,
	onClick,
	...props
}) {
	const ctx = useXAccordionContext();
	const isActive = ctx?.isItemActive(value);
	const [expanded, setExpanded] = useState(isActive);

	const toggleExpanded = () => {
		ctx || setExpanded((v) => !v);
	};

	const handleClick = (event) => {
		if (disabled) {
			return;
		}
		onClick?.(event);
		ctx?.onChange?.(value);
		toggleExpanded(event);
	};
	return (
		<div
			{...props}
			className={classNames('x-accordion-tab', {
				'x-accordion-tab--expanded': isActive ?? expanded,
				'x-accordion-tab--disabled': disabled,
			})}
		>
			<div
				className="x-accordion-control"
				role="button"
				disabled={disabled}
				aria-expanded={isActive ?? expanded}
				onClick={handleClick}
			>
				<div>{header}</div>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						className="x-accordion-chevron"
					>
						<path
							fillRule="evenodd"
							d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</div>
			<div className="x-accordion-panel">
				<div className="x-accordion-content">{children}</div>
			</div>
		</div>
	);
}

XAccordionTab.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	header: PropTypes.string,
	disabled: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onClick: PropTypes.func,
};
