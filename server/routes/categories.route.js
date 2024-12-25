const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.js');
const Account = require('../models/Account.js');
const Category = require('../models/Category.js');
const Transaction = require('../models/Transaction.js');
const router = express.Router({ mergeParams: true });
const auth = require('../middlewares/auth.js');

const {
	addCategory,
	updateCategory,
	deleteCategory,
	getCategories,
	getCategory,
} = require('../controllers/category.controller.js');

router.use(auth);

router.get('/types', async (req, res) => {
	res.send({ data: { expense: 'Расход', income: 'Доход' /*transfer: 'Перевод'*/ } });
});

router.get('/', async (req, res) => {
	try {
		const user = await User.findById(req.user._id).populate('accounts');
		const result = {};
		for (let account of user.accounts) {
			await account.populate('owner');
			account.owner.password = null;
			account.owner.accounts = null;
			await account.populate('categories');
			result[account._id] = account.categories;
		}
		res.send({ data: result });
	} catch (error) {
		res.status(500).send({
			message: 'На сервере произошла ошибка. Попробуйте позже',
		});
	}
});

router.post('/', async (req, res) => {
	const newCategory = await addCategory(req.body);
	res.send({ data: newCategory });
});

router.get('/:id', async (req, res) => {
	const category = await getCategory(req.params.id);
	res.send({ data: category });
});

router.patch('/:id', async (req, res) => {
	const newCategory = await updateCategory(req.params.id, req.body);
	res.send({ data: newCategory });
});

router.delete('/:id', async (req, res) => {
	const category = await deleteCategory(req.params.id);
	res.send({ data: category });
});

module.exports = router;
