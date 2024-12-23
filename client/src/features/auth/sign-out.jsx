import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../entites/auth/authSlice';
export default (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logOut = () =>
		dispatch(logoutUser())
			.unwrap()
			.then(() => {
				navigate('/');
			});
	return (
		<Button {...props} onClick={logOut}>
			Выйти
		</Button>
	);
};
