import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../widgets';
export function MainLayout() {
	return (
		<div className="container min-h-full flex flex-col justify-between m-auto relative bg-white">
			<Header className="fixed top-0 container z-40" />
			<main className="pt-32 pb-5">
				<Outlet />
			</main>
			<Footer className="" />
		</div>
	);
}
