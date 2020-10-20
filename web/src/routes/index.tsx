import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import useAuth from '../contexts/auth';

function Routes () {
	const { signed } = useAuth();

	return <BrowserRouter>{signed ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>;
}

export default Routes;
