const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.js');
const Account = require('../models/Account.js');
const Category = require('../models/Category.js');
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

const { addCategory } = require('../controllers/category.controller.js');

router.use(auth);

router.get('/types', async (req, res) => {
	res.send({
		data: {
			cash: 'Наличные',
			account: 'Счет',
			bank_account: 'Банковский счет',
			debit_card: 'Дебетовая карта',
			credit_card: 'Кедитная карта',
			investment: 'Вклад',
		},
	});
});

router.get('/', async (req, res) => {
	try {
		await req.user.populate('accounts');

		for (let account of req.user.accounts) {
			await account.populate('owner');
			account.owner.password = null;
			account.owner.accounts = null;
		}

		res.send({ data: req.user.accounts });
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
	await addCategory({
		account: newAccount._id,
		label: 'Перевод',
		type: 'transfer',
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
	const transaction = await getAccount(req.params.id);
	if (String(transaction.owner._id) !== String(req.user._id)) {
		await User.findByIdAndUpdate(req.user._id, {
			$pull: { accounts: req.params.id },
		});
		return res.send({ data: transaction });
	}
	const transactions = await Transaction.find({
		account: req.params.id,
	}).limit(1);
	if (transactions.length > 0) {
		res.status(400).send({
			error: 'Нельзя удалить пока есть транзакции',
		});
	} else {
		res.send({ data: await deleteAccount(req.params.id) });
	}
});

module.exports = router;
