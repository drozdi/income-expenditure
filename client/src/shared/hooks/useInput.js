import { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from '../utils/debounce';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { useForkRef } from './useForkRef';
const validation = (value, rules = []) => {
	return rules.map((rule) => rule(value)).filter((v) => v !== true);
};
export const useInput = (props) => {
	const {
		initialValue,
		error: errorProp = false,
		disabled = false,
		required = false,
		rules = [],
		lazyRules = false,
		ref: externalRef,
		...other
	} = props;
	const inputRef = useRef();
	const handleRef = useForkRef(externalRef, inputRef);
	const externalEventHandlers = {
		...extractEventHandlers(other),
	};

	//todo: formContext
	const formControlContext = null;

	const [value, setValue] = useState(initialValue);
	const [dirty, setDirty] = useState(false);
	const [focus, setFocus] = useState(false);
	const [errors, setErrors] = useState(!lazyRules ? validation(value, rules) : []);

	const error = useMemo(() => errorProp || errors.length > 0, [errorProp, errors]);

	const checkValue = debounce((value) => {
		setErrors(validation(value, rules));
	}, 100);

	const createHandleFocus = (otherHandlers) => (event) => {
		if (formControlContext?.disabled) {
			event.stopPropagation();
			return;
		}
		otherHandlers.onFocus?.(event);
		formControlContext?.onFocus?.(event);
		setFocus(true);
	};
	const createHandleBlur = (otherHandlers) => (event) => {
		otherHandlers.onBlur?.(event);
		formControlContext?.onBlur?.(event);
		setFocus(false);
		setDirty(true);
	};
	const createHandleChange =
		(otherHandlers) =>
		(event, ...args) => {
			const element = event.target || inputRef.current;
			setValue(element.value);
			otherHandlers.onChange?.(event, ...args);
			formControlContext?.onChange?.(event, ...args);
		};

	//todo: onChange onInput ???
	const createHandleInput =
		(otherHandlers) =>
		(event, ...args) => {
			const element = event.target || inputRef.current;
			setValue(element.value);
			otherHandlers.onInput?.(event, ...args);
			formControlContext?.onInput?.(event, ...args);
		};

	const createHandleClick = (otherHandlers) => (event) => {
		if (inputRef.current && event.currentTarget === event.target) {
			inputRef.current.focus();
		}
		otherHandlers.onClick?.(event);
	};

	useEffect(() => {
		checkValue(value);
	}, [value]);

	const attrs = {
		'aria-invalid': error || undefined,
		//value,
		required,
		disabled,
		ref: handleRef,
		...extractEventHandlers,
		onBlur: createHandleBlur(externalEventHandlers),
		onFocus: createHandleFocus(externalEventHandlers),
		onClick: createHandleClick(externalEventHandlers),
		onChange: createHandleChange(externalEventHandlers),
	};

	return {
		value,
		dirty,
		error,
		errors,
		focus,
		disabled,
		inputRef,
		attrs,
	};
};
