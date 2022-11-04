const router = require('express').Router();
const authController = require('./controllers/authController');
const petsController = require('./controllers/petsController');

router.use('/auth', authController);
router.use('/pets', petsController);


module.exports = router;