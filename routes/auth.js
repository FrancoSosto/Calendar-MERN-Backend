/*

Rutas de Usuarios / auth
host + /api/auth

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const {
	createUser,
	revalidateToken,
	userLogin,
} = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post(
	'/new',
	[
		// middlewares
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe de ser de 6 caracteres').isLength({
			min: 6,
		}),
		validateFields,
	],
	createUser
);

router.post(
	'/',
	[
		// middlewares
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe de ser de 6 caracteres').isLength({
			min: 6,
		}),
		validateFields,
	],
	userLogin
);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;
