const router = require('express').Router();

const { createUser, login } = require('../controllers/user');
const { createUserValidator, loginValidator } = require('../validators/userValidator');

router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginValidator, login);

module.exports = router;
