import express from 'express';
const router = express.Router();
import * as auth from '../controller/auth.js';
import * as v from '../validators/auth.js';

router.post(
	'/register',
	v.validateRegisterRequest,
	v.isRequestValidated,
	auth.register
);

router.post('/login', v.validateLoginRequest, v.isRequestValidated, auth.login);

router.get('/', (req, res) => {
	res.send('Hello world from Auth!');
});

export default router;
