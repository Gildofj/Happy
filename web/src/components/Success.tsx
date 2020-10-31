import React from 'react';
import { Link } from 'react-router-dom';

import successImg from '../images/logo-success.svg';

export default function Success (
	title = 'Ebaaa!',
	message = 'O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)',
	buttonText = 'Voltar para o mapa',
) {
	<div id="success-message">
		<div className="content-wrapper">
			<img src={successImg} alt="Happy" />

			<main>
				<h1>{title}</h1>
				<p>{message}</p>
			</main>

			<Link to="/app" className="enter-app">
				{buttonText}
			</Link>
		</div>
	</div>;
}
