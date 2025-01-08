import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuth } from '../../entites/auth/authSlice';

export default function ProtectedRoute({ to = '/auth/signIn', children = <Outlet /> }) {
	const isAuth = useSelector(selectIsAuth);
	if (!isAuth) {
		return <Navigate to={to} replace />;
	}
	return children;
}

ProtectedRoute.propTypes = {
	to: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
