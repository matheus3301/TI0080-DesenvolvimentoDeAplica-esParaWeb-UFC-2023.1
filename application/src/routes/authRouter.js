const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/', authController.loginPage);
router.post('/', authController.handleLoginForm);

module.exports = router;
