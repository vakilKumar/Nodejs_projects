const express = require('express');
const { loginUser } = require('../components/login');
const { signup } = require('../components/signup');
const router = express.Router();

router.post('/', loginUser);
// router.post('/:email', loginUser);
// router.get('/', signup)


module.exports = router;