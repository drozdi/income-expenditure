const Account = require('../models/Account');
const Category = require('../models/Category');
const Transaction = require('../models/Transaction');

async function addTransaction(transaction) {
	delete transaction._id;
	const newTransaction = await Transaction.create({ ...transaction });

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
};
