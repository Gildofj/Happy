import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) return res.status(401).send({ error: 'No token provided' });

	const [ scheme, token ] = authHeader.split(' ');

	try {
		const jwtTokenInfo = await promisify(jwt.verify)(token, 'secret');

		req.cookies = jwtTokenInfo as User;

		next();
	} catch (err) {
		return res.status(401).send({ error: 'Token invalid' });
	}
};

export default authMiddleware;
