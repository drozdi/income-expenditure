const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema(
	{
		account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
		type: {
			type: String,
			required: true,
			enum: ['income', 'expense', 'transfer'],
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		link: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
		date: { type: Date, default: Date.now },
		sum: { type: Number, required: true },
		comment: { type: String, required: false },
	},
	{ timestamps: true },
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
