const User = require('../models/User');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

async function addAccount(account) {
	const newAccount = await Account.create(account);

	await newAccount.populate('owner');
	await newAccount.populate('categories');

	newAccount.owner.password = null;
	newAccount.owner.accounts = null;

	return newAccount;
}

// edit
async function updateAccount(id, account) {
	const newAccount = await Account.findByIdAndUpdate(id, account, {
		returnDocument: 'after',
	});

	await newAccount.populate('owner');
	await newAccount.populate('categories');

	newAccount.owner.password = null;
	newAccount.owner.accounts = null;

	return newAccount;
}

// delete
async function deleteAccount(id) {
	const account = await Account.findById(id).populate('owner');
	await account.populate('categories');
	account.categories.map(async (category) => {
		await category.deleteOne();
	});
	await User.findByIdAndUpdate(account.owner._id, { $push: { accounts: newAccount } });

	return await account.deleteOne();
}

// get list with search and pagination
async function getAccounts(filter) {
	const data = await Account.find(filter);
	data.forEach(async (account) => {
		await account.populate('owner');
		await account.populate('categories');
		account.owner.password = null;
		account.owner.accounts = null;
	});
	return data;
}

// get item
async function getAccount(id) {
	const account = await Account.findById(id).populate('owner');
	await account.populate('categories');
	account.owner.password = null;
	account.owner.accounts = null;
	return account;
}

module.exports = {
	addAccount,
	updateAccount,
	deleteAccount,
	getAccounts,
	getAccount,
};
