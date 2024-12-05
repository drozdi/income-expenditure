import { useRoutes } from 'react-router-dom';
import { routes } from '../shared/config/routers';

export const AppRouter = () => {
	const routesElement = useRoutes(routes());
	return routesElement;
};
