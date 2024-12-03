import classNames from 'classnames';
import './style.scss';
export function XItemLabel({
	children,
	className,
	overline = false,
	caption = false,
	header = false,
	lines = false,
}) {
	return (
		<div
			className={classNames('x-item__label', className, {
				'x-item__label--overline': overline,
				'x-item__label--caption': caption,
				'x-item__label--header': header,
				'x-item__label--lines': lines,
			})}
		>
			{children}
		</div>
	);
}
