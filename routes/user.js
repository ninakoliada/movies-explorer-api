const router = require('express').Router();

const { updateUser, getUser, signout } = require('../controllers/user');
const { updateUserValidator } = require('../validators/userValidator');

router.patch('/users/me', updateUserValidator, updateUser);
router.get('/users/me', getUser);
router.get('/signout', signout);

module.exports = router;
