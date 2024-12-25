const express = require('express');
const router = express.Router({ mergeParams: true });

// /api/auth
router.use('/auth', require('./auth.route'));
router.use('/settings', require('./settings.route'));
router.use('/accounts', require('./accounts.route'));
router.use('/categories', require('./categories.route'));
router.use('/transactions', require('./transactions.route'));

module.exports = router;
