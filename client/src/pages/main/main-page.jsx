import { Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAccounts } from '../../entites/accounts/accountsSlice';
import StatisticsAccount from '../../features/statistics/account';
import { WidgetAccountsList } from '../../widgets/accounts';
import { WidgetTransactionsList } from '../../widgets/transactions';
export function MainPage() {
	const [account, setAccount] = useState(null);
	const accounts = useSelector(selectAccounts);
	useEffect(() => setAccount(accounts?.[0]?._id), [accounts]);
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
