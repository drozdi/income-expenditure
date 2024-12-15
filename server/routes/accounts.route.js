const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.js');
const Transaction = require('../models/Transaction.js');
const router = express.Router({ mergeParams: true });
const auth = require('../middlewares/auth.js');
const {
	addAccount,
	updateAccount,
	deleteAccount,
	getAccounts,
	getAccount,
} = require('../controllers/account.controller');
router.use(auth);

router.get('/', async (req, res) => {
	try {
		const user = await User.findById(req.user._id).populate({
			path: 'accounts',
			populate: {
				path: 'owner',
			},
		});

		user.accounts.forEach((account) => {
			account.owner.password = null;
			account.owner.accounts = null;
		});

		res.send({ data: user.accounts });
	} catch (error) {
		res.status(500).send({
			message: 'На сервере произошла ошибка. Попробуйте позже',
		});
	}
});

router.post('/', async (req, res) => {
	const newAccount = await addAccount({
		...req.body,
		owner: req.user._id,
	});
	await User.findByIdAndUpdate(req.user._id, { $push: { accounts: newAccount } });
	res.send({ data: newAccount });
});

router.get('/:id', async (req, res) => {
	const account = await getAccount(req.params.id);

	res.send({ data: account });
});

router.patch('/:id', async (req, res) => {
	const updatedAccount = await updateAccount(req.params.id, req.body);

	res.send({ data: updatedAccount });
});

router.delete('/:id', async (req, res) => {
	const transactions = await Transaction.find({
		account: req.params.id,
	}).limit(1);
	if (transactions.length > 0) {
		res.status(400).send({
			error: 'Нельзя удалить пока есть транзакции',
		});
	} else {
		await deleteAccount(req.params.id);
		res.send({ error: null });
	}
});

module.exports = router;
