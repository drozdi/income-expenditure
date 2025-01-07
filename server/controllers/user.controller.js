const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');

async function register(data) {
	if (!data.password) {
		throw new Error('Password is empty');
	}

	const hashedPassword = await bcrypt.hash(data.password, 12);

	const user = await User.create({ ...data, password: hashedPassword });
	const token = generate({ id: user.id });

	return { user, token };
}

async function login(email, password) {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('User not found');
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new Error('Wrong password');
	}

	const token = generate({ id: user.id });

	return { token, user };
}

async function getUsers() {
	return User.find();
}

async function deleteUser(id) {
	return User.deleteOne({ _id: id });
}

async function updateUser(id, userData) {
	return User.findByIdAndUpdate(id, userData, { returnDocument: 'after' });
}

module.exports = {
	register,
	login,
	getUsers,
	deleteUser,
	updateUser,
};
