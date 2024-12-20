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

const {
	addCategory,
	updateCategory,
	deleteCategory,
	getCategories,
	getCategory,
} = require('../controllers/category.controller.js');

router.use(auth);

router.get('/type', async (req, res) => {
	res.send({
		data: {
			cash: 'cash',
			bank_account: 'bank_account',
			credit_card: 'credit_card',
			investment: 'investment',
		},
	});
});

router.get('/', async (req, res) => {
	try {
		const user = await User.findById(req.user._id).populate('accounts');

		for (let account of user.accounts) {
			await account.populate('owner');
			account.owner.password = null;
			account.owner.accounts = null;
		}

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

router.post('/:accountId/categories/', async (req, res) => {
	const newCategory = await addCategory(req.params.accountId, req.body);
	res.send({ data: newCategory });
});

router.patch('/:accountId/categories/:id', async (req, res) => {
	const newCategory = await updateCategory(req.params.id, req.body);
	res.send({ data: newCategory });
});

router.delete('/:accountId/categories/:id', async (req, res) => {
	await deleteCategory(req.params.id);
	res.send({ error: null });
});

module.exports = router;
