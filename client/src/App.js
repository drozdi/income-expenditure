import { DialogsProvider } from '@toolpad/core/useDialogs';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import { AppLoader } from './app/app-loader';
import { AppProvider } from './app/app-provider';
import { AppRouter } from './app/app-router';

export function App() {
	return (
		<NotificationsProvider>
			<AppProvider>
				<AppLoader>
					<DialogsProvider>
						<AppRouter />
					</DialogsProvider>
				</AppLoader>
			</AppProvider>
		</NotificationsProvider>
	);
}
