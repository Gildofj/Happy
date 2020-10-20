import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import * as Yup from 'yup';

import User from '../models/User';
import usersView from '../views/users_view';
import auth from './AuthController';

export default {
	async show (req: Request, res: Response) {
		const { id } = req.cookies.user;

		const userRepository = getRepository(User);

		const user = await userRepository.findOneOrFail(id);

		if (!user) return res.status(401).json({ error: 'Token is invalid or expired' });

		return res.json(usersView.render(user));
	},

	async create (req: Request, res: Response) {
		const { name, email, password } = req.body;

		const userRepository = getRepository(User);
		try {
			if (await userRepository.findOne({ email })) {
				return res.status(400).json({ error: 'User already exists' });
			}

			const passwordHash = await bcrypt.hash(password, 8);

			const data = {
				name,
				email,
				password: passwordHash,
			};

			const schema = Yup.object().shape({
				name: Yup.string().required(),
				email: Yup.string().email().required(),
				password: Yup.string().required(),
			});

			schema.validate(data, {
				abortEarly: false,
			});

			const user = userRepository.create(data);

			await userRepository.save(user);

			return res.status(201).json(usersView.render(user));
		} catch (err) {
			return res.status(400).json({ error: 'User registration failed' });
		}
	},

	async edit (req: Request, res: Response) {
		const { id } = req.params;
		const { name, email, password } = req.body;

		const userRepository = getRepository(User);

		const passwordHash = await bcrypt.hash(password, 8);

		const userForUpdate = (await userRepository.findOneOrFail(id)) as User;

		userForUpdate.name = name;
		userForUpdate.email = email;
		userForUpdate.password = passwordHash;

		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().required(),
		});

		schema.validate(userForUpdate, {
			abortEarly: false,
		});

		await userRepository.save(userForUpdate);

		return res.json(usersView.render(userForUpdate));
	},

	async authenticate (req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			const userRepository = getRepository(User);

			const user = await userRepository.findOne({ email });

			if (!user) return res.status(400).json({ error: 'User not found' });

			if (!await auth.compareHash({ hashPassword: password, user }))
				return res.status(400).json({ error: 'Invalid password' });

			return res.json({
				user,
				token: auth.generateToken(user),
			});
		} catch (err) {
			return;
		}
	},
};
