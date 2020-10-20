import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import auth from '../services/auth';

interface User {
	name: string;
	email: string;
}

interface UserLogin {
	email: string;
	password: string;
}

interface AuthContextData {
	signed: boolean;
	user: User | null;
	loading: boolean;
	login(user: UserLogin): Promise<void>;
	logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
	const [ user, setUser ] = useState<User | null>(null);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		async function loadStorageData () {
			const storageUser = localStorage.getItem('user');
			const storageToken = localStorage.getItem('token');

			api.defaults.headers.Authorization = `Bearer ${storageToken}`;

			if (storageUser && storageToken) setUser(JSON.parse(storageUser));
		}

		loadStorageData();
	}, []);

	async function login (user: UserLogin) {
		const response = await auth.login({ email: user.email, password: user.password });

		setUser(response.user);

		api.defaults.headers.Authorization = `Bearer ${response.token}`;

		localStorage.setItem('user', JSON.stringify(response.user));
		localStorage.setItem('token', JSON.stringify(response.token));
	}

	async function logout () {
		setUser(null);

		localStorage.removeItem('user');
		localStorage.removeItem('token');
	}

	return (
		<AuthContext.Provider value={{ signed: !!user, user, loading, login, logout }}>{children}</AuthContext.Provider>
	);
};

export default function useAuth () {
	const context = useContext(AuthContext);

	return context;
}
