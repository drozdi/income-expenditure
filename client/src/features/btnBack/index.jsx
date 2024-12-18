import { useNavigate } from 'react-router-dom';
import { XBtn } from '../../shared/ui';
export default function ({ className }) {
	const navigate = useNavigate();
	return (
		<XBtn className={className} onClick={() => navigate(-1)} color="primary">
			Назад
		</XBtn>
	);
}
