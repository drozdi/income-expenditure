import { Link } from '@mui/material';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default forwardRef(function ({ children, ...props }, ref) {
	return (
		<Link {...props} component={RouterLink} ref={ref}>
			{children}
		</Link>
	);
});
