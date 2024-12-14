import { Navigate } from 'react-router-dom';
import { DefaultLayout, MainLayout } from '../../layout';
import { CategoriesPage, SourcesPage } from '../../pages';

import { SignIn } from '../../pages/sign-in/sign-in';
import { SignUp } from '../../pages/sign-up/sign-up';
import { SourcePage } from '../../pages/source/source-page';
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
				path: 'auth',
				element: <DefaultLayout />,
				children: [
					{
						path: '',
						element: <Navigate to="/auth/signIn" />,
					},
					{
						path: 'signIn',
						element: <SignIn />,
					},
					{
						path: 'signUp',
						element: <SignUp />,
					},
					{
						path: 'signOut',
						element: <div>SignOut</div>,
					},
					{
						path: '*',
						element: <Navigate to="/auth/signIn" />,
					},
				],
			},
			{
				path: 'categories',
				element: <CategoriesPage />,
			},
			{
				path: 'sources',
				element: <SourcesPage />,
			},
			{
				path: 'source',
				element: <SourcePage />,
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
