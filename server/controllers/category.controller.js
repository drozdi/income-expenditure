const Category = require('../models/Category');

async function addCategory(category) {
	const newCategory = await Category.create(category);

	await newCategory.populate({
		path: 'categories',
		populate: 'source',
	});

	return newCategory;
}

async function updatedCategory(id, category) {
	const newCategory = await Category.findByIdAndUpdate(id, category, {
		returnDocument: 'after',
	});

	await newCategory.populate({
		path: 'categories',
		populate: 'source',
	});

	return newCategory;
}

// todo check operation
async function deleteCategory(id) {
	return await Category.deleteOne({ _id: id });
}

async function getCategories(filter = {}) {
	return await Category.find(filter);
}

// get item
function getCategory(id) {
	return Category.findById(id).populate({
		path: 'categories',
		populate: 'source',
	});
}

module.exports = {
	addCategory,
	updatedCategory,
	deleteCategory,
	getCategories,
	getCategory,
};
