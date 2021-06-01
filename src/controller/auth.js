import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import shortid from 'shortid';

const createAccessToken = (_id, role) => {
	return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_TOKEN_EXPIRE,
	});
};

export const register = (req, res) => {
	let userByEmail = { email: req.body.email };
	User.findOne(userByEmail)
		.then(async user => {
			if (user) {
				res.send({
					message: `${userByEmail.email} is already registered.`,
				});
			}

			const hashedPassword = await bcrypt.hash(req.body.password, 10);

			const newUser = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hashedPassword,
				username: shortid.generate(),
			});

			newUser
				.save()
				.then(user => {
					if (user) {
						const token = createAccessToken(user._id, user.role);
						const { _id, firstName, lastName, email, role, fullName } = user;
						res.send({
							token,
							user: { _id, firstName, lastName, email, role, fullName },
						});
					}
				})
				.catch(err => {
					res.send(err);
				});
		})
		.catch(err => {
			res.send(err);
		});
};

export const login = (req, res) => {
	let userByEmail = { email: req.body.email };
	User.findOne(userByEmail)
		.then(async user => {
			if (user) {
				const isPassword = await user.authenticate(req.body.password);
				if (isPassword && user.role === 'user') {
					const token = createAccessToken(user._id, user.role);
					const { _id, firstName, lastName, email, role, fullName } = user;
					res.send({
						token,
						user: { _id, firstName, lastName, email, role, fullName },
						message: 'Logged in successfully.',
					});
				} else {
					res.send({
						message: 'Invalid password.',
					});
				}
			} else {
				res.send({
					message: `${userByEmail.email} is not yet registered.`,
				});
			}
		})
		.catch(err => {
			res.send(err);
		});
};
