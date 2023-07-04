const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const authMiddleware = require('../middlewares/authMiddleware');
const userTypeMiddleware = require('../middlewares/userTypeMiddleware');

router.post(
  '/',
  authMiddleware,
  userTypeMiddleware(['TEACHER']),
  examController.createExam
);
router.get(
  '/',
  authMiddleware,
  userTypeMiddleware(['TEACHER']),
  examController.getAllExams
);
router.get(
  '/:id',
  authMiddleware,
  userTypeMiddleware(['TEACHER']),
  examController.getExamById
);
router.delete(
  '/:id',
  authMiddleware,
  userTypeMiddleware(['TEACHER']),
  examController.deleteExamById
);

module.exports = router;
