import classNames from 'classnames';
import PropTypes from 'prop-types';
import { createElement as h } from 'react';
import './style.css';

const roleAttrExceptions = ['ul', 'ol'];
export function XList({
	tag = 'div',
	children,
	className,
	role = null,
	dense = false,
	separator = false,
	bordered = false,
}) {
	const attrRole = roleAttrExceptions.includes(tag) ? null : (role ?? 'list');
	return h(
		tag,
		{
			className: classNames('x-list', className, {
				'x-list--dense': dense,
				'x-list--separator': separator,
				'x-list--bordered': bordered,
			}),
			role: attrRole,
		},
		children,
	);
}

XList.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	tag: PropTypes.string,
	role: PropTypes.string,
	dense: PropTypes.bool,
	separator: PropTypes.bool,
	bordered: PropTypes.bool,
};
