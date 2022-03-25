const router = require('express').Router();

const { getUsers } = require('../controllers/user');

router.get('/users', getUsers);

// router.patch('/users/me', updateUser);
// router.post('/signin', )

module.exports = router;
