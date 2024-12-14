import classNames from 'classnames';
import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react';
import { isArray } from '../../utils/is';
import { XMessage } from '../message';
import './style.css';
import { XMessagesContext } from './XMessagesContext';

let messageIdx = 0;

export const XMessages = memo(
	forwardRef(
		(
			{
				className,
				style,
				row,
				life,
				closable,
				color,
				outline,
				underlined,
				square,
				sticky,
			},
			ref,
		) => {
			const [list, setList] = useState([]);
			const elementRef = useRef(null);

			const clear = () => setList([]);
			const show = (message) => {
				if (!message) {
					return;
				}
				setList((current) => assignList(current, message, true));
			};
			const replace = (message) => {
				setList((current) => assignList(current, message, false));
			};
			const assignList = (current, message, copy = true) => {
				let messages = [];
				if (isArray(message)) {
					const multipleMessages = message.reduce((acc, message) => {
						acc.push({
							life,
							closable,
							color,
							outline,
							square,
							underlined,
							sticky,
							_pId: messageIdx++,
							...message,
						});
						return acc;
					}, []);
					if (copy) {
						messages = [...current, ...multipleMessages];
					} else {
						messages = multipleMessages;
					}
				} else {
					if (copy) {
						messages = [
							...current,
							{
								life,
								closable,
								color,
								outline,
								square,
								underlined,
								sticky,
								_pId: messageIdx++,
								...message,
							},
						];
					} else {
						messages = [
							{
								life,
								closable,
								color,
								outline,
								square,
								underlined,
								sticky,
								_pId: messageIdx++,
								...message,
							},
						];
					}
				}
				return messages;
			};
			const context = {
				remove: (_pId) => {
					setList((n) => n.filter((item) => item._pId !== _pId));
				},
			};

			useImperativeHandle(ref, () => ({
				show,
				replace,
				clear,
				getElement: () => elementRef.current,
			}));

			return (
				<XMessagesContext.Provider value={context}>
					<div
						className={classNames('x-messages', className, {
							'x-messages--row': row,
						})}
						style={style}
						ref={elementRef}
					>
						{list.map((message) => (
							<XMessage key={message._pId} {...message} />
						))}
					</div>
				</XMessagesContext.Provider>
			);
		},
	),
);
