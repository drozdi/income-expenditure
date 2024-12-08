import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../entites/auth/authSlice';
import { XBtn } from '../../../shared/ui';
export default () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logOut = () =>
		dispatch(logoutUser())
			.unwrap()
			.then(() => {
				navigate('/');
			});
	return <XBtn onClick={logOut}>Выйти</XBtn>;
};
