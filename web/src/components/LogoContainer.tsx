import React from 'react';

import '../styles/components/logo-container.css';

import logoTipo from '../images/logo-tipo.svg';

const LogoContainer = () => (
	<div className="container-presentation">
		<img src={logoTipo} alt="Happy" />

		<div className="location">
			<h2>Florianópolis</h2>
			<p>Santa Catarina</p>
		</div>
	</div>
);

export default LogoContainer;
