import { Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import StatisticsAccount from '../../features/statistics/account';
import { WidgetAccountsList } from '../../widgets/accounts';
import { WidgetTransactionsList } from '../../widgets/transactions';
export function MainPage() {
	const [account, setAccount] = useState(null);
	useEffect(() => console.log(account), [account]);
	return (
		<Stack direction="row" useFlexGap flexWrap="wrap">
			<Box
				sx={{
					width: '50%',
				}}
			>
				<WidgetTransactionsList />
			</Box>
			<Box
				sx={{
					width: '50%',
				}}
			>
				<WidgetAccountsList onClick={setAccount} />
			</Box>
			{account && <StatisticsAccount accountId={account} />}
		</Stack>
	);
}
