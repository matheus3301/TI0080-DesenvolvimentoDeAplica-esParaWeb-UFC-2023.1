const express = require('express');
const router = express.Router();
const principalController = require('../controllers/principalController');
const authMiddleware = require('../middlewares/authMiddleware');
const userTypeMiddleware = require('../middlewares/userTypeMiddleware');

router.get(
  '/me',
  authMiddleware,
  userTypeMiddleware(['PRINCIPAL']),
  principalController.getPersonalInformation
);

module.exports = router;
