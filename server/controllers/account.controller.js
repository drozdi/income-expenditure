const Account = require('../models/Account');

async function addAccount(account) {
	const newAccount = await Account.create(account);

	await newAccount.populate({
		path: 'accounts',
		populate: 'owner',
	});

	return newAccount;
}

// edit
async function updateAccount(id, account) {
	const newAccount = await Account.findByIdAndUpdate(id, account, {
		returnDocument: 'after',
	});

	await newAccount.populate({
		path: 'accounts',
		populate: 'owner',
	});

	return newAccount;
}

// delete
function deleteAccount(id) {
	return Account.deleteOne({ _id: id });
}

// get list with search and pagination
async function getAccounts(filter) {
	const data = await Account.find(filter);
	data.forEach(
		async (account) =>
			await account.populate({
				path: 'accounts',
				populate: 'owner',
			}),
	);
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
