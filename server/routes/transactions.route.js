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
	updateIncomeTransaction,
	updateExpenseTransaction,
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
				{ ...expense._doc, link: { ...income._doc } },
				{ ...income._doc, link: { ...expense._doc } },
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

router.delete('/:id', async (req, res) => {
	const transaction = await deleteTransaction(req.params.id);
	const result = [transaction];
	if (transaction.link) {
		result.push(await deleteTransaction(transaction.link));
	}
	res.send({ data: result });
});

router.patch('/:id', async (req, res) => {
	const transaction = await getTransaction(req.params.id);
	const isTransfer = !!transaction.link;

	let updatedTransaction;
	let updatedLinkTransaction;

	if (transaction.type === 'income') {
		updatedTransaction = await updateIncomeTransaction(req.params.id, {
			...req.body,
			account: isTransfer ? req.body.to : req.body.account,
			to: undefined,
			type: undefined,
		});

		if (isTransfer && req.body.account && req.body.to) {
			updatedLinkTransaction = await updateExpenseTransaction(transaction.link, {
				...req.body,
				to: undefined,
				type: undefined,
			});
		} else if (isTransfer) {
			updatedTransaction.link = undefined;
			updatedLinkTransaction = await deleteTransaction(transaction.link);
			updatedLinkTransaction._doc.removed = true;
		} else if (req.body.account && req.body.to) {
			updatedLinkTransaction = await expenseTransaction({
				...req.body,
				owner: req.user._id,
				to: undefined,
				link: updatedTransaction,
				category: await Category.findOne({
					account: req.body.to,
					type: 'transfer',
				}),
			});
			await updatedLinkTransaction.populate('account');
			updatedTransaction.category = await Category.findOne({
				account: updatedTransaction.account,
				type: 'transfer',
			});

			updatedTransaction.link = { ...updatedLinkTransaction._doc };
			updatedLinkTransaction._doc.added = true;
			updatedLinkTransaction._doc.link = { ...updatedTransaction._doc };
		}
		await updatedTransaction.save();
		await updatedTransaction.populate('link');
	} else if (transaction.type === 'expense') {
		updatedTransaction = await updateExpenseTransaction(req.params.id, {
			...req.body,
			to: undefined,
			type: undefined,
		});
		if (isTransfer && req.body.to) {
			updatedLinkTransaction = await updateIncomeTransaction(transaction.link, {
				...req.body,
				account: req.body.to,
				to: undefined,
				type: undefined,
			});
		} else if (isTransfer) {
			updatedTransaction.link = undefined;
			updatedLinkTransaction = await deleteTransaction(transaction.link);
			updatedLinkTransaction._doc.removed = true;
		} else if (req.body.to) {
			updatedLinkTransaction = await incomeTransaction({
				...req.body,
				owner: req.user._id,
				account: req.body.to,
				to: undefined,
				link: updatedTransaction,
				category: await Category.findOne({
					account: req.body.to,
					type: 'transfer',
				}),
			});
			await updatedLinkTransaction.populate('account');
			updatedTransaction.category = await Category.findOne({
				account: updatedTransaction.account,
				type: 'transfer',
			});
			updatedTransaction.link = { ...updatedLinkTransaction._doc };
			updatedLinkTransaction._doc.added = true;
			updatedLinkTransaction._doc.link = { ...updatedTransaction._doc };
		}

		await updatedTransaction.save();
		await updatedTransaction.populate('link');
	}

	const result = [{ ...updatedTransaction._doc }];
	if (isTransfer || updatedLinkTransaction?._doc.added) {
		result.push({
			...updatedLinkTransaction._doc,
		});
	} //*/
	console.log(result);
	res.send({ data: result });
});

module.exports = router;
