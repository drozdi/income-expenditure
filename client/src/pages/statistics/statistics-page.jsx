import { useParams } from 'react-router-dom';
import StatisticsAccount from '../../features/statistics/account';

export function StatisticsPage() {
	const { account } = useParams();
	return <StatisticsAccount accountId={account} />;
}
