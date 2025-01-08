import { Navigate, Route, Routes } from 'react-router-dom';
import { DefaultLayout, MainLayout } from '../layout';
import {
	AccountPage,
	AccountsPage,
	CategoriesPage,
	MainPage,
	SettingsPage,
	StatisticsPage,
	TransactionPage,
	TransactionsPage,
} from '../pages';

import ProtectedRoute from '../features/protected-route/protectedRoute';
import { SignIn } from '../pages/sign-in/sign-in';
import { SignUp } from '../pages/sign-up/sign-up';

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="auth" element={<DefaultLayout />}>
					<Route path="" element={<Navigate to="/auth/signIn" />} />
					<Route path="signIn" element={<SignIn />} />
					<Route path="signUp" element={<SignUp />} />
					<Route path="signOut" element={<div>SignOut</div>} />
					<Route path="*" element={<Navigate to="/auth/signIn" />} />
				</Route>

				<Route
					path=""
					element={
						<ProtectedRoute>
							<MainPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="settings"
					element={
						<ProtectedRoute>
							<SettingsPage />
						</ProtectedRoute>
					}
				/>
				<Route path="categories" element={<ProtectedRoute />}>
					<Route path="" element={<CategoriesPage />} />
					<Route path=":accountId" element={<CategoriesPage />} />
				</Route>
				<Route
					path="accounts"
					element={
						<ProtectedRoute>
							<AccountsPage />
						</ProtectedRoute>
					}
				/>
				<Route path="account" element={<ProtectedRoute />}>
					<Route path="" element={<AccountPage />} />
					<Route path=":id" element={<AccountPage />} />
				</Route>
				<Route
					path="transaction/:type/:id"
					//path="transaction/:type(income|expense)"
					element={
						<ProtectedRoute>
							<TransactionPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="transaction/:type/"
					//path="transaction/:type(income|expense)"
					element={
						<ProtectedRoute>
							<TransactionPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="transactions/"
					element={
						<ProtectedRoute>
							<TransactionsPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="statistics/:account/"
					element={
						<ProtectedRoute>
							<StatisticsPage />
						</ProtectedRoute>
					}
				/>
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
