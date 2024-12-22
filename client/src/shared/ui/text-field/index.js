import {
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
	useFormControl,
} from '@mui/material';
import * as React from 'react';

function MyFormHelperText(props) {
	const { focused } = useFormControl() || {};

	const helperText = React.useMemo(() => {
		if (focused) {
			return props.helperText;
		}

		return ' ';
	}, [focused, props]);

	return <FormHelperText {...props}>{helperText}</FormHelperText>;
}

export default function (props) {
	return (
		<FormControl>
			<InputLabel {...props}>{props.label}</InputLabel>
			<Input {...props} />
			<MyFormHelperText {...props} />
		</FormControl>
	);
}
