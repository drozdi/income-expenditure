import { XBtn } from '../../shared/ui';

export default function ({ className, operation, accountId }) {
	//const { accountId } = useParams();
	return (
		<XBtn
			className={className}
			to={`/account/${accountId}/category/?operation=${operation}`}
			color="primary"
		>
			Добавить
		</XBtn>
	);
}
