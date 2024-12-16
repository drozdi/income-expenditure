const Account = require('../models/Account');
const Category = require('../models/Category');

async function addCategory(accountId, category) {
	const newCategory = await Category.create({ ...category, account: accountId });

	await Account.findByIdAndUpdate(accountId, { $push: { categories: newCategory } });

	await newCategory.populate('account');

	return newCategory;
}

async function updateCategory(id, category) {
	const updatedCategory = await Category.findByIdAndUpdate(id, category, {
		returnDocument: 'after',
	});

	await updatedCategory.populate('account');

	return updatedCategory;
}

// todo check operation
async function deleteCategory(id) {
	const category = await getCategory(id);
	Account.findByIdAndUpdate(category.account._id, { $pull: { categories: id } });
	return await category.deleteOne();
}

async function getCategories(filter = {}) {
	return await Category.find(filter);
}

// get item
async function getCategory(id) {
	return await Category.findById(id).populate('account');
}

module.exports = {
	addCategory,
	updateCategory,
	deleteCategory,
	getCategories,
	getCategory,
};
