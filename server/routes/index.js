const express = require('express');
const router = express.Router({ mergeParams: true });

// /api/auth
router.use('/auth', require('./auth'));

module.exports = router;
