const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema(
	{
		account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
		operation: {
			type: String,
			required: true,
		},
		category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
		owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		link: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
		operationDate: { type: Date, default: Date.now },
		sum: { type: Number, required: true },
		comment: { type: String, required: false },
	},
	{ timestamps: true },
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
