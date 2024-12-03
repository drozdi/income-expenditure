import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './style.scss';
export function XAccordionTab({ className, children, header, ...props }) {
	const [expanded, setExpanded] = useState(false);
	let toggleExpanded = (e) => {
		setExpanded((v) => !v);
	};
	return (
		<div
			{...props}
			className={classNames('x-accordion-tab', {
				'x-accordion-tab--expanded': expanded,
			})}
		>
			<div className="x-accordion-header" onClick={toggleExpanded}>
				<div>{header}</div>
				<div>
					<i className="x-accordion-header-icon"></i>
				</div>
			</div>
			<div className="x-accordion-content">{children}</div>
		</div>
	);
}

XAccordionTab.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	header: PropTypes.string,
};
