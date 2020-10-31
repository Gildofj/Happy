import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from '../pages/Landing';
import Login from '../pages/Users/Login';
import CreateUser from '../pages/Users/CreateUser';
import OrphanagesMap from '../pages/Orphanages/OrphanagesMap';
import Orphanage from '../pages/Orphanages/Orphanage';
import CreateOrphanage from '../pages/Orphanages/CreateOrphanage';

function AuthRoutes () {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Landing} />
				<Route path="/users/register" component={CreateUser} />
				<Route path="/users/login" component={Login} />
				<Route path="/app" component={OrphanagesMap} />
				<Route path="/orphanages/create" component={CreateOrphanage} />
				<Route path="/orphanages/:id" component={Orphanage} />
			</Switch>
		</BrowserRouter>
	);
}

export default AuthRoutes;
