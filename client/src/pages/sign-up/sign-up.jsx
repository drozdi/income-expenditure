import { Container, Typography } from '@mui/material';
import SignUpForm from '../../features/auth/sign-up-form';

export const SignUp = () => {
	return (
		<Container maxWidth="xs">
			<Typography gutterBottom variant="h5" align="center">
				Регистрация
			</Typography>
			<SignUpForm />
		</Container>
	);
};
