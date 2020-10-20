import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/User';

interface HashPasswordCompareContent {
	hashPassword: string;
	user: User;
}

export default {
	compareHash (hash: HashPasswordCompareContent) {
		return bcrypt.compare(hash.hashPassword, hash.user.password);
	},

	generateToken (user: User) {
		return jwt.sign({ user }, 'secret', {
			expiresIn: 86400,
		});
	},
};
