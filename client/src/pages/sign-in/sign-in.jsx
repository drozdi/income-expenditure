import { Container, Typography } from '@mui/material';
import SignInForm from '../../features/auth/sign-in-form';
export const SignIn = () => {
	return (
		<Container maxWidth="xs">
			<Typography gutterBottom variant="h5" align="center">
				Вход
			</Typography>
			<SignInForm />
		</Container>
	);
};
