const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.js');
const Account = require('../models/Account.js');
const Category = require('../models/Category.js');
const Transaction = require('../models/Transaction.js');
const router = express.Router({ mergeParams: true });
const auth = require('../middlewares/auth.js');

const {
	addTransaction,
	updateTransaction,
	deleteTransaction,
	getTransactions,
	getTransaction,
} = require('../controllers/transaction.controller.js');

router.use(auth);

router.get('/', async (req, res) => {
	const transactions = await getTransactions();
	res.send({ data: transactions });
});

router.post('/', async (req, res) => {
	const newTransaction = await addTransaction({ ...req.body, owner: req.user._id });

	if (newTransaction.type === 'income') {
		const account = await Account.findById(newTransaction.account);
		account.balance += newTransaction.amount;
		await account.save();
	} else if (newTransaction.type === 'expense') {
		const account = await Account.findById(newTransaction.account);
		account.balance -= newTransaction.amount;
		await account.save();
	} /*else if (newTransaction.type === 'transfer') {
		const account = await Account.findById(newTransaction.account);
		account.balance -= newTransaction.amount;
		await account.save();
	}*/

	res.send({ data: newTransaction });
});

router.get('/:id', async (req, res) => {
	const transaction = await getTransaction(req.params.id);
	res.send({ data: transaction });
});

router.patch('/:id', async (req, res) => {
	const newTransaction = await updateTransaction(req.params.id, req.body);
	res.send({ data: newTransaction });
});

router.delete('/:id', async (req, res) => {
	const transaction = await deleteTransaction(req.params.id);
	res.send({ data: transaction });
});

module.exports = router;
