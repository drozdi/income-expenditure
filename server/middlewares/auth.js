const tokenService = require('../services/token.service');

function auth(req, res, next) {
	req.user = {
		_id: '6755707168b4fed5a811b808',
	};
	next(); //*/
	/*if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		const data = tokenService.validateAccess(token);
		req.user = data;

		next();
	} catch (e) {
		res.status(401).json({ message: 'Unauthorized' });
	} //*/
}

module.exports = auth;
