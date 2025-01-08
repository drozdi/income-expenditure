const express = require('express');
const User = require('../models/User.js');
const router = express.Router({ mergeParams: true });
const auth = require('../middlewares/auth.js');
const Account = require('../models/Account.js');
const mongoose = require('mongoose');

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

router.get('/users', async (req, res) => {
	try {
		const myAccaounts = (
			await Account.find({
				owner: req.user._id,
			})
		).map((a) => String(a._id));
		const users = await User.find({
			_id: { $nin: req.user },
		});
		users.forEach(async (user) => {
			user.password = null;
			user.accounts = user.accounts.filter((a) => myAccaounts.includes(String(a)));
		});
		res.send({ data: users });
	} catch (error) {
		res.status(500).send({
			message: 'На сервере произошла ошибка. Попробуйте позже',
		});
	}
});

router.patch('/users', async (req, res) => {
	try {
		const myAccaounts = (
			await Account.find({
				owner: req.user._id,
			})
		).map((a) => String(a._id));

		const ret = [];
		for (const user of req.body) {
			for (const acc of myAccaounts) {
				await User.findByIdAndUpdate(user._id, {
					$pull: { accounts: acc },
				});
			}
			const userObj = await User.findByIdAndUpdate(
				user._id,
				{
					$addToSet: { accounts: user.accounts },
				},
				{
					returnDocument: 'after',
				},
			);
			userObj.accounts = userObj.accounts.filter((a) => {
				return myAccaounts.includes(String(a));
			});
			ret.push(userObj);
		}
		res.send({ data: ret });
	} catch (error) {
		res.status(500).send({
			message: 'На сервере произошла ошибка. Попробуйте позже',
		});
	}
});

module.exports = router;
