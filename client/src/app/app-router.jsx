import { Navigate, useRoutes } from 'react-router-dom';
import { DefaultLayout, MainLayout } from '../layout';
import {
	AccountPage,
	AccountsPage,
	CategoriesPage,
	CategoryPage,
	TransactionPage,
} from '../pages';

import { SignIn } from '../pages/sign-in/sign-in';
import { SignUp } from '../pages/sign-up/sign-up';

export const AppRouter = () => {
	const routesElement = useRoutes([
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
					element: <DefaultLayout />,
					children: [
						{
							path: '',
							element: <CategoriesPage />,
						},
						{
							path: ':accountId',
							element: <CategoriesPage />,
						},
					],
				},
				{
					path: 'accounts',
					element: <AccountsPage />,
				},
				{
					path: 'account',
					element: <DefaultLayout />,
					children: [
						{
							path: ':id',
							element: <AccountPage />,
						},
						{
							path: '',
							element: <AccountPage />,
						},
						{
							path: ':accountId/category/:id',
							element: <CategoryPage />,
						},
						{
							path: ':accountId/category/',
							element: <CategoryPage />,
						},
					],
				},
				{
					path: 'transaction/',
					element: <DefaultLayout />,
					children: [
						{ path: ':id', element: <TransactionPage /> },
						{ path: '', element: <TransactionPage /> },
					],
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
	]);
	return routesElement;
};
