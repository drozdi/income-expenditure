const express = require('express');
const router = express.Router({ mergeParams: true });

// /api/auth
router.use('/auth', require('./auth.route'));
router.use('/source', require('./source.route'));

module.exports = router;
