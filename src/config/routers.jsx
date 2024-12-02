import { Layout } from '../components/example/utils/Layout';
import exampleRoters from '../components/example/utils/routers';
export const routes = () => [
	{
		path: '/',
		children: [
			{
				path: 'example',
				element: <Layout />,
				children: exampleRoters,
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
