import { XBtn } from '../../shared/ui';

export default function ({ className, accountId }) {
	//const { accountId } = useParams();
	return (
		<XBtn
			className={className}
			to={`/account/${accountId}/category/`}
			color="primary"
		>
			Добавить
		</XBtn>
	);
}
