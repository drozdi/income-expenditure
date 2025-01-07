import { Stack } from '@mui/material';
import { WidgetAccountsList } from '../../widgets/accounts';
import { WidgetTransactionsList } from '../../widgets/transactions';
export function MainPage() {
	return (
		<Stack direction="column" spacing={2}>
			<WidgetAccountsList />
			<WidgetTransactionsList />
		</Stack>
	);
}
