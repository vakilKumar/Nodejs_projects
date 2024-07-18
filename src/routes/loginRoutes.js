const express = require('express');
const { loginUser } = require('../components/login');
const router = express.Router();

router.get('/', loginUser);
// router.post('/:email', loginUser);

module.exports = router;