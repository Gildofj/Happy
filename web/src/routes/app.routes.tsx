import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from '../pages/Landing';

function AppRoutes () {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Landing} />
			</Switch>
		</BrowserRouter>
	);
}

export default AppRoutes;
