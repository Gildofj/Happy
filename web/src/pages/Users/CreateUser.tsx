import React, { FormEvent, useState } from 'react';
import * as Yup from 'yup';

import '../../styles/pages/users/form-user.css';

import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import LogoContainer from '../../components/LogoContainer';
import { FiArrowLeft } from 'react-icons/fi';

export default function CreateUser () {
	const history = useHistory();
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');

	async function handleSubmit (event: FormEvent) {
		event.preventDefault();

		try {
			await Yup.object()
				.shape({
					password: Yup.string(),
					confirmPassword: Yup.string().oneOf([ Yup.ref('password') ], 'Passwords must match'),
				})
				.validate({ password, confirmPassword });

			const user = {
				name,
				email,
				password,
			};

			await api.post('users/create', user);

			history.push('/login');
		} catch (err) {
			alert(err);
		}
	}

	return (
		<div id="page-login">
			<LogoContainer />

			<a className="go-back-button" type="button" href={'/users/login'}>
				<FiArrowLeft size={25} color="#15C3D6" />
			</a>

			<main>
				<form className="user-form" onSubmit={handleSubmit}>
					<legend>Cadastro</legend>

					<div className="input-block">
						<label htmlFor="name">Nome</label>
						<input id="name" value={name} onChange={(event) => setName(event.target.value)} />
					</div>

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

					<div className="input-block">
						<label htmlFor="password">Confirmar Senha</label>
						<input
							id="password-confirm"
							type="password"
							value={confirmPassword}
							onChange={(event) => setConfirmPassword(event.target.value)}
						/>
					</div>

					<button
						className="confirm-button"
						type="submit"
						disabled={!name && !email && !password && !confirmPassword}
					>
						Confirmar
					</button>
				</form>
			</main>
		</div>
	);
}
