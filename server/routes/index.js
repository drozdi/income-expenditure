const express = require('express');
const router = express.Router({ mergeParams: true });

// /api/auth
router.use('/auth', require('./auth.route'));
router.use('/accounts', require('./accounts.route'));
router.use('/operations', require('./operations.route'));

module.exports = router;
