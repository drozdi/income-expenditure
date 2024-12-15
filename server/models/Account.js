const mongoose = require('mongoose');
const validator = require('validator');

const AccountSchema = mongoose.Schema(
	{
		label: { type: String, required: true },
		balance: { type: Number, required: true, default: 0 },
		owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true },
);

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
