const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema(
	{
		account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
		label: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
			enum: ['income', 'expense', 'transfer'],
		},
	},
	{ timestamps: true },
);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
