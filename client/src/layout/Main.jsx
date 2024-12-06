import { Outlet } from 'react-router-dom';
import { Footer, Header, Sidebar } from '../widgets';
export function MainLayout() {
	return (
		<div className="container min-h-full flex flex-col justify-between m-auto relative bg-white">
			<Header className="fixed top-0 container z-40" />
			<div class="flex pt-32 pb-5 overflow-hidden bg-gray-50">
				<Sidebar className="w-64 hidden sm:block" />
				<div className="relative w-full p-4 bg-gray-50">
					<main className="">
						<Outlet />
					</main>
				</div>
			</div>
			<Footer className="" />
		</div>
	);
}
