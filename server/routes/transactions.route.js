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
	incomeTransaction,
	expenseTransaction,
} = require('../controllers/transaction.controller.js');

router.use(auth);

router.get('/', async (req, res) => {
	const transactions = await getTransactions();
	//await transactions.exec();
	res.send({ data: transactions });
});

router.post('/', async (req, res) => {
	const reqData = { ...req.body, owner: req.user._id };
	if (reqData.type === 'transfer' && reqData.to) {
		const expense = await expenseTransaction({
			...reqData,
			to: undefined,
			category: await Category.findOne({
				account: reqData.account,
				type: 'transfer',
			}),
		});
		const income = await incomeTransaction({
			...reqData,
			account: reqData.to,
			to: undefined,
			link: expense,
			category: await Category.findOne({
				account: reqData.to,
				type: 'transfer',
			}),
		});
		expense.link = income;
		await expense.save();
		res.send({
			data: [
				{ ...expense._doc, link: undefined },
				{ ...income._doc, link: undefined },
			],
		});
		return;
	} else if (reqData.account === 'transfer') {
		return res.status(400).send({
			error: 'Transfer transaction must have a "to" account',
		});
	}

	let newTransaction;
	if (reqData.type === 'income') {
		newTransaction = await incomeTransaction(reqData);
	} else if (reqData.type === 'expense') {
		newTransaction = await expenseTransaction(reqData);
	}
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
	const result = [transaction];
	if (transaction.link) {
		result.push(await deleteTransaction(transaction.link));
	}
	res.send({ data: result });
});

module.exports = router;
