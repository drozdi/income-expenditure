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
	await req.user.populate('accounts');

	const transactions = await getTransactions({
		account: { $in: req.user.accounts },
	});
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

		expense.category = expense.category?._id || expense.category;
		income.category = income.category?._id || income.category;

		return res.send({
			data: [
				{ ...expense._doc, link: { ...income._doc, link: undefined } },
				{ ...income._doc, link: { ...expense._doc, link: undefined } },
			],
		});
	} else if (reqData.type === 'transfer' && reqData.from) {
		const expense = await expenseTransaction({
			...reqData,
			account: reqData.from,
			from: undefined,
			category: await Category.findOne({
				account: reqData.from,
				type: 'transfer',
			}),
		});
		const income = await incomeTransaction({
			...reqData,
			from: undefined,
			link: expense,
			category: await Category.findOne({
				account: reqData.account,
				type: 'transfer',
			}),
		});
		expense.link = income;
		await expense.save();

		expense.category = expense.category?._id || expense.category;
		income.category = income.category?._id || income.category;

		return res.send({
			data: [
				{ ...expense._doc, link: { ...income._doc, link: undefined } },
				{ ...income._doc, link: { ...expense._doc, link: undefined } },
			],
		});
	} else if (reqData.type === 'transfer') {
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
	const reqData = { ...req.body };

	let updatedTransaction;
	let updatedLinkTransaction;

	if (transaction.type === 'expense') {
		updatedTransaction = await updateExpenseTransaction(req.params.id, {
			...reqData,
			to: undefined,
			type: undefined,
		});

		if (isTransfer && reqData.to) {
			updatedLinkTransaction = await updateIncomeTransaction(transaction.link, {
				...reqData,
				account: reqData.to,
				to: undefined,
				type: undefined,
			});
		} else if (isTransfer) {
			updatedTransaction.link = undefined;
			updatedLinkTransaction = await deleteTransaction(transaction.link);
			updatedLinkTransaction._doc.removed = true;
		} else if (reqData.to) {
			updatedLinkTransaction = await incomeTransaction({
				...reqData,
				owner: req.user._id,
				account: reqData.to,
				to: undefined,
				link: updatedTransaction,
				category: await Category.findOne({
					account: reqData.to,
					type: 'transfer',
				}),
			});
			updatedTransaction.category = await Category.findOne({
				account: updatedTransaction.account,
				type: 'transfer',
			});

			updatedTransaction.category =
				updatedTransaction.category?._id || updatedTransaction.category;
			updatedLinkTransaction.category =
				updatedLinkTransaction.category?._id || updatedLinkTransaction.category;

			updatedTransaction.link = { ...updatedLinkTransaction._doc };
			updatedLinkTransaction._doc.added = true;
			updatedLinkTransaction._doc.link = { ...updatedTransaction._doc };
		}
	} else if (transaction.type === 'income') {
		updatedTransaction = await updateIncomeTransaction(req.params.id, {
			...reqData,
			from: undefined,
			type: undefined,
		});

		if (isTransfer && reqData.from) {
			updatedLinkTransaction = await updateExpenseTransaction(transaction.link, {
				...reqData,
				account: reqData.from,
				type: undefined,
			});
		} else if (isTransfer) {
			updatedTransaction.link = undefined;
			updatedLinkTransaction = await deleteTransaction(transaction.link);
			updatedLinkTransaction._doc.removed = true;
		} else if (reqData.from) {
			updatedLinkTransaction = await expenseTransaction({
				...reqData,
				owner: req.user._id,
				account: reqData.from,
				link: updatedTransaction,
				from: undefined,
				category: await Category.findOne({
					account: reqData.from,
					type: 'transfer',
				}),
			});
			updatedTransaction.category = await Category.findOne({
				account: updatedTransaction.account,
				type: 'transfer',
			});

			updatedTransaction.category =
				updatedTransaction.category?._id || updatedTransaction.category;
			updatedLinkTransaction.category =
				updatedLinkTransaction.category?._id || updatedLinkTransaction.category;

			updatedTransaction.link = { ...updatedLinkTransaction._doc };
			updatedLinkTransaction._doc.added = true;
			updatedLinkTransaction._doc.link = { ...updatedTransaction._doc };
		}
	}

	await updatedTransaction.save();
	await updatedTransaction.populate('link');

	const result = [{ ...updatedTransaction._doc }];
	if (isTransfer || updatedLinkTransaction?._doc.added) {
		result.push({
			...updatedLinkTransaction._doc,
		});
	}
	res.send({ data: result });
});

module.exports = router;
