import { MainLayout } from '../../layout';
import { CategoriesPage } from '../../pages';
export const routes = () => [
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '',
				element: (
					<div className="flex flex-col items-center text-xl">
						<h2 className="text-2xl">Main</h2>
					</div>
				),
			},
			{
				path: 'categories',
				element: <CategoriesPage />,
			},

			{
				path: '404',
				element: (
					<div className="flex flex-col items-center text-xl">
						<h2 className="text-2xl">Ошибка</h2>
					</div>
				),
			},
		],
	},
	{
		path: '*',
		element: (
			<div className="flex flex-col items-center text-xl">
				<h2 className="text-2xl">Ошибка</h2>
			</div>
		),
	},
];
