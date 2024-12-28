import { Navigate, Route, Routes } from 'react-router-dom';
import { DefaultLayout, MainLayout } from '../layout';
import {
	AccountPage,
	AccountsPage,
	CategoriesPage,
	MainPage,
	SettingsPage,
	TransactionPage,
	TransactionsPage,
} from '../pages';

import { SignIn } from '../pages/sign-in/sign-in';
import { SignUp } from '../pages/sign-up/sign-up';

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<MainPage />} />
				<Route path="settings" element={<SettingsPage />} />
				<Route path="auth" element={<DefaultLayout />}>
					<Route path="" element={<Navigate to="/auth/signIn" />} />
					<Route path="signIn" element={<SignIn />} />
					<Route path="signUp" element={<SignUp />} />
					<Route path="signOut" element={<div>SignOut</div>} />
					<Route path="*" element={<Navigate to="/auth/signIn" />} />
				</Route>
				<Route path="categories" element={<DefaultLayout />}>
					<Route path="" element={<CategoriesPage />} />
					<Route path=":accountId" element={<CategoriesPage />} />
				</Route>
				<Route path="accounts" element={<AccountsPage />} />
				<Route path="account" element={<DefaultLayout />}>
					<Route path="" element={<AccountPage />} />
					<Route path=":id" element={<AccountPage />} />
				</Route>
				<Route
					path="transaction/:type/:id"
					//path="transaction/:type(income|expense)"
					element={<TransactionPage />}
				/>
				<Route path="transactions/" element={<TransactionsPage />} />
				<Route
					path="404"
					element={
						<div className="flex flex-col items-center text-xl">
							<h2 className="text-2xl">Ошибка</h2>
						</div>
					}
				/>
			</Route>
			<Route
				path="*"
				element={
					<div className="flex flex-col items-center text-xl">
						<h2 className="text-2xl">Ошибка</h2>
					</div>
				}
			/>
		</Routes>
	);
};
