import { AppProvider } from './app/app-provider';
import { AppRouter } from './app/app-router';
import { ToastProvider } from './features/toast';

export function App() {
	return (
		<ToastProvider>
			<AppProvider>
				<AppRouter />
			</AppProvider>
		</ToastProvider>
	);
}
