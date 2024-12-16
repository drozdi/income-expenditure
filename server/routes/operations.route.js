const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.js');
const tokenService = require('../services/token.service.js');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	res.send({ data: ['расход', 'доход'] });
});

module.exports = router;
