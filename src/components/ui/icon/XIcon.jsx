import classNames from 'classnames';
import { createElement as h } from 'react';
export function XIcon({ children, className, name, color, tag = 'i', ...props }) {
	name ||= children;
	if (!name) {
		return '';
	}
	color &&= color = ' text-' + color;
	color ||= '';
	return h(
		tag,
		{
			...props,
			className: classNames('x-icon', name.split('-')[0], name, color, className),
			'aria-hidden': 'true',
			role: 'presentation',
		},
		'',
	);
}
