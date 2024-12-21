import { Outlet } from 'react-router-dom';
import { Footer, Header, Sidebar } from '../widgets';
export function MainLayout() {
	return (
		<>
			<div className="container min-h-full flex flex-col justify-between m-auto relative">
				<Header className="fixed top-0 container z-40" />
				<div className="flex pt-32 pb-5 overflow-hidden">
					<Sidebar className="w-64 hidden sm:block" />
					<div className="relative w-full p-4">
						<main className="relative">
							<Outlet />
						</main>
					</div>
				</div>
				<Footer className="" />
			</div>
		</>
	);
}
