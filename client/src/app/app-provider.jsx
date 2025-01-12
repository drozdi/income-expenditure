import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DialogsProvider } from '@toolpad/core/useDialogs';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import 'dayjs/locale/ru';
import { Provider } from 'react-redux';
import { createStore } from '../shared/store';
const store = createStore();

export const AppProvider = ({ children }) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
			<NotificationsProvider>
				<DialogsProvider>
					<Provider store={store}>{children}</Provider>
				</DialogsProvider>
			</NotificationsProvider>
		</LocalizationProvider>
	);
};
