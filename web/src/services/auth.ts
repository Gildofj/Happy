import api from './api';

interface UserLogin {
	email: string;
	password: string;
}

export default {
	async login (user: UserLogin) {
		const response = await api.post('/users/authenticate', user);

		return response.data;
	},
};
