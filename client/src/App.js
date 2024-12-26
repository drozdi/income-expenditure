import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DialogsProvider } from '@toolpad/core/useDialogs';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import 'dayjs/locale/ru';
import { AppLoader } from './app/app-loader';
import { AppProvider } from './app/app-provider';
import { AppRouter } from './app/app-router';

export function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
			<NotificationsProvider>
				<DialogsProvider>
					<AppProvider>
						<AppLoader>
							<AppRouter />
						</AppLoader>
					</AppProvider>
				</DialogsProvider>
			</NotificationsProvider>
		</LocalizationProvider>
	);
}
