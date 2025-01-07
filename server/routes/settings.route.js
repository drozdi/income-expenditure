const express = require('express');
const User = require('../models/User.js');
const router = express.Router({ mergeParams: true });
const auth = require('../middlewares/auth.js');

router.use(auth);

router.get('/user', async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		user.password = undefined;
		res.send({ data: user });
	} catch (error) {
		res.status(500).send({
			message: 'На сервере произошла ошибка. Попробуйте позже',
		});
	}
});

router.get('/users', async (req, res) => {
	try {
		const users = await User.find({
			_id: { $nin: req.user },
		});
		users.forEach((user) => {
			user.password = null;
		});
		res.send({ data: users });
	} catch (error) {
		res.status(500).send({
			message: 'На сервере произошла ошибка. Попробуйте позже',
		});
	}
});

router.patch('/user', async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.user._id, req.body, {
			returnDocument: 'after',
		});
		user.password = undefined;
		res.send({ data: user });
	} catch (error) {
		res.status(500).send({
			message: 'На сервере произошла ошибка. Попробуйте позже',
		});
	}
});

module.exports = router;
