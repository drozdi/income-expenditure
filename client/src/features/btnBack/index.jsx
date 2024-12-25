import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Link from '../../shared/ui/link';
export default function ({
	className,
	children = 'Назад',
	color = 'grey-600',
	disabled,
}) {
	const navigate = useNavigate();
	return (
		<Button
			color={color}
			className={className}
			disabled={disabled}
			component={Link}
			variant="contained"
			onClick={() => navigate(-1)}
		>
			{children}
		</Button>
	);
}
