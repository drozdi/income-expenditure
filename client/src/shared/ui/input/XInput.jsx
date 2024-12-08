//todo add styles label over border
import classNames from 'classnames';
import { forwardRef, memo, useEffect, useRef, useState } from 'react';
import { useInput } from '../../hooks/useInput';
import './style.scss';
export const XInput = memo(
	forwardRef(function XInput(props, ref) {
		/**
		 * initialValue
		 * error
		 * disabled
		 * required
		 * rules,
		 */
		const {
			value,
			dirty,
			error,
			errors,
			focus,
			inputRef,
			disabled,
			attrs: _attrs,
		} = useInput({ ...props, ref });

		const {
			lazyRules = false,
			className = '',
			dense = false,
			outline = false,
			field = false,
			square = false,
			underlined = false,
			stackLabel = false,
			before = '',
			after = '',
			prepend = '',
			append = '',
			label = '',
			labelColor = '',
			color = '',

			hint,
			hideHint = false,
			hideMessage = false,
			errorMessage,
			//???????
			bg = '',

			...other
		} = props;

		const prependRef = useRef();
		const [shiftLabel, setShiftLabel] = useState(0);

		useEffect(() => {
			setShiftLabel(prependRef.current?.offsetWidth || 0);
		}, [prependRef.current]);

		const isShift = dense && outline && (focus || stackLabel);
		const labelStyle = {
			left: isShift ? -shiftLabel : '',
		};

		const isError = dirty && (error || !!errorMessage);
		const errorMes = errorMessage || errors[0] || '';

		const attrs = {
			type: 'text',
			...other,
			..._attrs,
			className: classNames('x-input-native', className),
		};

		const modColor = isError ? 'negative' : color;

		return (
			<div
				className={classNames('x-input', {
					'x-input--outline': outline,
					'x-input--field': field,
					'x-input--square': square,
					'x-input--underlined': underlined,
					'x-input--dense': dense,
					'x-input--stack-label': stackLabel,
					'x-input--disabled': disabled,
					[`x-input--${modColor}`]: !!modColor,
				})}
			>
				{before && <div className="x-input-before">{before}</div>}
				<div className="x-input-container">
					{prepend && (
						<div className="x-input-prepend" ref={prependRef}>
							{prepend}
						</div>
					)}
					{append && <div className="x-input-append">{append}</div>}
					<div className="x-input-underlay"></div>
					<div className="x-input-outline">
						<div className="x-input-outline-start"></div>
						<div className="x-input-outline-notch">
							{label && (
								<label htmlFor={props.id} className="x-input-label">
									{label}
								</label>
							)}
						</div>
						<div className="x-input-outline-end"></div>
					</div>
					<div className="x-input-underlined"></div>
					<div className="x-input-control">
						<input {...attrs} />
						{label && (
							<label
								htmlFor={props.id}
								className={classNames(
									'x-input-label',
									labelColor || modColor
										? 'text-' + (labelColor || modColor)
										: '',
								)}
								style={labelStyle}
							>
								{label}
							</label>
						)}
					</div>
				</div>
				{after && <div className="x-input-after">{after}</div>}
				{!hideMessage && (
					<div
						className={classNames('x-input-messages', {
							'x-input-messages--hint': !isError && !hideHint,
							'x-input-messages--error': isError,
						})}
						role="alert"
						aria-live="polite"
					>
						{hint === ' ' ? (
							<p className="x-input-message x-input-message--hint">
								&nbsp;
							</p>
						) : (
							hint && (
								<p className="x-input-message x-input-message--hint">
									{hint}
								</p>
							)
						)}
						{dirty && (
							<p className="x-input-message x-input-message--error">
								{errorMes}
							</p>
						)}
					</div>
				)}
			</div>
		);
	}),
);
