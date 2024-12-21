//todo add styles label over border
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { forwardRef, memo, useMemo, useRef } from 'react';
import { useInput } from '../../hooks/useInput';
import './style.css';
const XInputRoot = forwardRef(function XInput(props, ref) {
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
		className,
		dense,
		outline,
		field,
		square,
		underlined,
		stackLabel,
		before,
		after,
		prepend,
		append,
		label,
		labelColor,
		color,

		lazyRules,
		hint,
		hideHint,
		hideMessage,
		errorMessage,

		...other
	} = props;

	const controlRef = useRef();

	const shiftLabel = useMemo(
		() => controlRef.current?.offsetLeft || 0,
		[controlRef.current, prepend],
	);

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
	const isTextarea = attrs.type === 'textarea';
	if (isTextarea) {
		delete attrs.type;
	}
	const Tag = isTextarea ? 'textarea' : 'input';

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
				{prepend && <div className="x-input-prepend">{prepend}</div>}
				<div className="x-input-control" ref={controlRef}>
					<Tag {...attrs} />
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
						<p className="x-input-message x-input-message--hint">&nbsp;</p>
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
});

export const XInput = memo(XInputRoot);

XInputRoot.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,

	dense: PropTypes.bool,
	outline: PropTypes.bool,
	field: PropTypes.bool,
	square: PropTypes.bool,
	underlined: PropTypes.bool,
	stackLabel: PropTypes.bool,

	color: PropTypes.string,
	labelColor: PropTypes.string,

	label: PropTypes.string,

	rules: PropTypes.array,
	lazyRules: PropTypes.bool,

	hint: PropTypes.string,
	hideHint: PropTypes.bool,
	hideMessage: PropTypes.bool,
	errorMessage: PropTypes.string,

	before: PropTypes.node,
	after: PropTypes.node,
	prepend: PropTypes.node,
	append: PropTypes.node,
};
