const User = require('../models/User');
const { verify } = require('../helpers/token');

async function auth(req, res, next) {
	if (req.method === 'OPTIONS') {
		return next();
	}
	try {
		const tokenData = verify(req.cookies.token);

		const user = await User.findOne({ _id: tokenData.id });

		if (!user) {
			res.status(401).send({ error: 'Authenticated user not found' });

			return;
		}

		req.user = user;

		next();
	} catch (e) {
		res.status(401).send({ error: e.message || 'Token error' });
	}
}

module.exports = auth;
