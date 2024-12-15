const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

async function addAccount(account) {
	const newAccount = await Account.create(account);

	await newAccount.populate('owner');

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

	newAccount.owner.password = null;
	newAccount.owner.accounts = null;

	return newAccount;
}

// delete
async function deleteAccount(id) {
	return await Account.deleteOne({ _id: id });
}

// get list with search and pagination
async function getAccounts(filter) {
	const data = await Account.find(filter);
	data.forEach(async (account) => {
		await account.populate('owner');
		account.owner.password = null;
		account.owner.accounts = null;
	});
	return data;
}

// get item
function getAccount(id) {
	return Account.findById(id).populate({
		path: 'accounts',
		populate: 'owner',
	});
}

module.exports = {
	addAccount,
	updateAccount,
	deleteAccount,
	getAccounts,
	getAccount,
};
