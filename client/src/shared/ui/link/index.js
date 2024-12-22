import { Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function ({ children, ...props }) {
	return (
		<Link {...props} component={RouterLink}>
			{children}
		</Link>
	);
}
