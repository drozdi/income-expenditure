import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsAuth, getIsLoggedIn } from '../../entites/auth/authSlice';

const ProtectedRoute = ({ redirectPath = '/auth/signIn', children }) => {
	const isAuth = useSelector(getIsAuth());
	const isLoggedIn = useSelector(getIsLoggedIn());
	if (!isAuth) {
		return <Navigate to={redirectPath} replace />;
	}

	return children;
};

ProtectedRoute.propTypes = {
	redirectPath: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default ProtectedRoute;
