const mongoose = require('mongoose');
const validator = require('validator');

const AccountSchema = mongoose.Schema(
	{
		label: { type: String, required: true },
		balance: { type: Number, required: true, default: 0 },
		type: {
			type: String,
			enum: [
				'cash',
				'credit_card',
				'debit_card',
				'bank_account',
				'account',
				'investment',
			],
		},
		owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
	},
	{ timestamps: true },
);

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
