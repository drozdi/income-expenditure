import { AppLoader } from './app/app-loader';
import { AppProvider } from './app/app-provider';
import { AppRouter } from './app/app-router';

export function App() {
	return (
		<AppProvider>
			<AppLoader>
				<AppRouter />
			</AppLoader>
		</AppProvider>
	);
}
