import { AppLoader } from './app/app-loader';
import { AppProvider } from './app/app-provider';
import { AppRouter } from './app/app-router';
import { ToastProvider } from './features/toast';

export function App() {
	return (
		<ToastProvider>
			<AppProvider>
				<AppLoader>
					<AppRouter />
				</AppLoader>
			</AppProvider>
		</ToastProvider>
	);
}
