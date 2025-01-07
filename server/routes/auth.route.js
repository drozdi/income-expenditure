const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router({ mergeParams: true });

const { register, login } = require('../controllers/user.controller.js');

router.post('/signUp', [
	check('email', 'Некорректный email').isEmail(),
	check('password', 'Минимальная длина пароля 8 символов').isLength({ min: 8 }),
	async (req, res) => {
		try {
			const exitingUser = await User.findOne({ email: req.body.email });

			if (exitingUser) {
				return res.status(400).json({
					error: 'EMAIL_EXISTS',
				});
			}

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					error: 'INVALID_DATA',
				});
			}

			const { user, token } = await register(req.body);

			res.cookie('token', token, { httpOnly: true }).send({
				error: null,
				userId: user._id,
			});
		} catch (e) {
			res.status(500).json({
				message: e.message || 'На сервере произошла ошибка. Попробуйте позже',
			});
		}
	},
]);

router.post('/signIn', [
	check('email', 'Email некорректный').normalizeEmail().isEmail(),
	check('password', 'Пароль не может быть пустым').exists(),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					error: 'INVALID_DATA',
				});
			}

			const { user, token } = await login(req.body.email, req.body.password);

			res.cookie('token', token, { httpOnly: true }).send({
				error: null,
				userId: user._id,
			});
		} catch (e) {
			res.status(500).json({
				message: e.message || 'На сервере произошла ошибка. Попробуйте позже',
			});
		}
	},
]);

router.post('/signOut', async (req, res) => {
	res.cookie('token', '', { httpOnly: true }).send({});
});

module.exports = router;
