import { ErrorRequestHandler, response } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
	[key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
	if (error instanceof ValidationError) {
		let errors: ValidationErrors = {};

		error.inner.forEach((err) => {
			errors[err.path] = err.errors;
		});

		return response.status(400).json({ message: 'Validation fails', errors });
	}

	return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
