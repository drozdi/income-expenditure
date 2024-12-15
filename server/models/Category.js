const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema(
	{
		account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
		label: {
			type: String,
			required: true,
		},
		operation: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
