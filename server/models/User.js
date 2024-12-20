const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema(
	{
		username: { type: String },
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: validator.isEmail,
				message: 'Invalid email',
			},
		},
		password: {
			type: String,
			required: true,
		},
		accounts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Account',
			},
		],
	},
	{ timestamps: true },
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
