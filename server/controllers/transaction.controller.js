const Account = require('../models/Account');
const Category = require('../models/Category');
const Transaction = require('../models/Transaction');

async function addTransaction(transaction) {
	delete transaction._id;
	const newTransaction = await Transaction.create({ ...transaction });
	return newTransaction;
}

async function incomeTransaction(transaction) {
	delete transaction._id;
	const newTransaction = await addTransaction({ ...transaction, type: 'income' });
	const account = await Account.findById(newTransaction.account);
	account.balance += newTransaction.amount;
	await account.save();
	newTransaction._doc.accountBalance = account.balance;
	return newTransaction;
}

async function expenseTransaction(transaction) {
	delete transaction._id;
	const newTransaction = await addTransaction({ ...transaction, type: 'expense' });
	const account = await Account.findById(newTransaction.account);
	account.balance -= newTransaction.amount;
	await account.save();
	newTransaction._doc.accountBalance = account.balance;
	return newTransaction;
}

async function updateTransaction(id, transaction) {
	const updatedTransaction = await Transaction.findByIdAndUpdate(id, transaction, {
		returnDocument: 'after',
	});

	return updatedTransaction;
}

// todo check operation
async function deleteTransaction(id) {
	const transaction = await getTransaction(id);
	Account.findByIdAndUpdate(transaction.account, { $pull: { categories: id } });
	return await transaction.deleteOne();
}

async function getTransactions(filter = {}) {
	return await Transaction.find(filter);
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
};
