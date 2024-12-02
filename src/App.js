import { useRoutes } from 'react-router-dom';
import { routes } from './config/routers';
export function App() {
	const routesElement = useRoutes(routes());
	return routesElement;
}
