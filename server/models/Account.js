const mongoose = require('mongoose');
const validator = require('validator');

const AccountSchema = mongoose.Schema(
	{
		label: { type: String, required: true },
		balance: { type: Number, required: true, default: 0 },
		type: {
			type: String,
			//required: true,
			enum: ['cash', 'bank_account', 'credit_card', 'investment'],
		},
		owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
	},
	{ timestamps: true },
);

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
