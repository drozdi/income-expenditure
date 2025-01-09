const Account = require('../models/Account');
const Category = require('../models/Category');
const Transaction = require('../models/Transaction');

async function addTransaction(transaction) {
	delete transaction._id;
	const newTransaction = await Transaction.create({ ...transaction });
	return newTransaction;
}

async function incomeTransaction(transaction) {
	const newTransaction = await addTransaction({ ...transaction, type: 'income' });
	const account = await Account.findById(newTransaction.account);
	account.balance += newTransaction.amount;
	await account.save();
	newTransaction._doc.accountBalance = account.balance;
	return newTransaction;
}

async function expenseTransaction(transaction) {
	const newTransaction = await addTransaction({ ...transaction, type: 'expense' });
	const account = await Account.findById(newTransaction.account);
	account.balance -= newTransaction.amount;
	await account.save();
	newTransaction._doc.accountBalance = account.balance;
	return newTransaction;
}

async function updateTransaction(id, transaction) {
	const updatedTransaction = await Transaction.findByIdAndUpdate(
		id,
		{ ...transaction, _id: undefined },
		{
			returnDocument: 'after',
		},
	);

	return updatedTransaction;
}

async function updateIncomeTransaction(id, body) {
	const transaction = await Transaction.findById(id);

	const calcBalance =
		String(transaction.account) != String(body.account) ||
		transaction.amount != body.amount;

	const account = await Account.findById(transaction.account);

	if (calcBalance) {
		account.balance -= transaction.amount;
	}

	await account.save();

	const updatedTransaction = await updateTransaction(id, body);

	const updatedAccount = await Account.findById(updatedTransaction.account);

	if (calcBalance) {
		updatedAccount.balance += updatedTransaction.amount;
	}

	await updatedAccount.save();

	await updatedTransaction.populate('link');

	updatedTransaction._doc.accountBalance = updatedAccount.balance;

	return updatedTransaction;
}

async function updateExpenseTransaction(id, body) {
	const transaction = await Transaction.findById(id);

	const calcBalance =
		String(transaction.account) != String(body.account) ||
		transaction.amount != body.amount;

	const account = await Account.findById(transaction.account);

	if (calcBalance) {
		account.balance += transaction.amount;
	}

	await account.save();

	const updatedTransaction = await updateTransaction(id, body);

	const updatedAccount = await Account.findById(updatedTransaction.account);

	if (calcBalance) {
		updatedAccount.balance -= updatedTransaction.amount;
	}

	await updatedAccount.save();

	await updatedTransaction.populate('link');

	updatedTransaction._doc.accountBalance = updatedAccount.balance;

	return updatedTransaction;
}

// todo check operation
async function deleteTransaction(id) {
	const transaction = await Transaction.findById(id);
	const account = await Account.findById(transaction.account);
	if (transaction.type === 'expense') {
		account.balance += transaction.amount;
	} else if (transaction.type === 'income') {
		account.balance -= transaction.amount;
	}
	await account.save();
	transaction._doc.accountBalance = account.balance;
	return await transaction.deleteOne();
}

async function getTransactions(filter = {}) {
	return await Transaction.find(filter).populate('link');
}

// get item
async function getTransaction(id) {
	return await Transaction.findById(id);
}

module.exports = {
	addTransaction,
	updateTransaction,
	deleteTransaction,
	getTransactions,
	getTransaction,
	incomeTransaction,
	expenseTransaction,
	updateIncomeTransaction,
	updateExpenseTransaction,
};
