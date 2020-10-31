import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import '../../styles/pages/users/form-user-login.css';
import '../../styles/pages/users/form-user.css';

import LogoContainer from '../../components/LogoContainer';

export default function Login () {
	const history = useHistory();
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	function handleSubmit (event: FormEvent) {
		alert('uhu');
	}

	return (
		<div id="page-login">
			<LogoContainer />

			{/* eslint-disable-next-line */}
			<a className="go-back-button" type="button" onClick={() => history.goBack()}>
				<FiArrowLeft size={25} color="#15C3D6" />
			</a>
			<main>
				<form className="user-form" onSubmit={handleSubmit}>
					<legend>Login</legend>

					<div className="input-block">
						<label htmlFor="email">E-mail</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>

					<div className="input-block">
						<label htmlFor="password">Senha</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
						/>
					</div>

					<Link to={'/users/register'}>Não possui cadastro?</Link>

					<button className="confirm-button" type="submit" disabled={!email && !password}>
						Confirmar
					</button>
				</form>
			</main>
		</div>
	);
}
