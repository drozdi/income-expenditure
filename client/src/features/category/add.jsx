import { XBtn } from '../../shared/ui';

export default function ({ className, type, accountId }) {
	//const { accountId } = useParams();
	return (
		<XBtn
			className={className}
			to={`/account/${accountId}/category/?type=${type}`}
			color="primary"
		>
			Добавить
		</XBtn>
	);
}
