import classNames from 'classnames';
import { forwardRef, memo, useCallback, useMemo } from 'react';
import { useTimeout } from '../../hooks/useTimeout';
import { isString } from '../../utils/is';
import { XBtn } from '../btn';
import { XIcon } from '../icon';
import { useXMessagesContext } from '../messages/XMessagesContext';
import { useXToastContext } from '../toast/XToastContext';
import './style.scss';

export const XMessage = memo(
	forwardRef(
		(
			{
				id,
				_pId,
				className,
				children,
				icon,
				color,
				style,
				outline,
				square,
				underlined,
				closable,
				life = 3000,
				sticky,
			},
			ref,
		) => {
			const Icon = useMemo(() => {
				if (icon?.type === XIcon) {
					return icon;
				} else if (isString(icon)) {
					return <XIcon>{icon}</XIcon>;
				}
			}, [icon]);

			const toast = useXToastContext();
			const context = useXMessagesContext();
			const isClosable = useMemo(
				() => (closable || sticky) && context,
				[closable, context],
			);
			const handleClose = useCallback((event) => {
				clearTimer();
				context?.remove(_pId);
				if (event) {
					event.preventDefault();
					event.stopPropagation();
				}
			}, []);
			const [clearTimer] = useTimeout(
				() => {
					handleClose(null);
				},
				life,
				!sticky,
			);
			const under = useMemo(
				() => toast?.underlined || underlined,
				[toast, underlined],
			);
			const attrs = useMemo(
				() => ({
					id,
					style,
					role: 'alert',
					'aria-live': toast ? 'assertive' : 'polite',
					'aria-atomic': 'true',
				}),
				[style],
			);
			return (
				<div
					{...attrs}
					className={classNames('x-message', {
						[`x-message--${color}`]: color,
						'x-message--square': square,
						'x-message--outline': outline,
						[`x-message--underlined-${under}`]: under,
					})}
					ref={ref}
				>
					<div className="x-message__backdor" />
					<div className="x-message__outline" />
					<div className={classNames('x-message__content', className)}>
						{Icon}
						{children}
					</div>
					{isClosable && (
						<div className="x-message__close">
							<XBtn
								icon="mdi-close"
								size="xs"
								flat={true}
								plain={true}
								onClick={handleClose}
							/>
						</div>
					)}
				</div>
			);
		},
	),
);
