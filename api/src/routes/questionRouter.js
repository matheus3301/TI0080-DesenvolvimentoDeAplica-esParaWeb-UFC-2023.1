const router = require('express').Router();
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middlewares/authMiddleware');
const userTypeMiddleware = require('../middlewares/userTypeMiddleware');

router.post(
  '/',
  authMiddleware,
  userTypeMiddleware(['TEACHER']),
  questionController.createQuestion
);
router.get(
  '/',
  authMiddleware,
  userTypeMiddleware(['TEACHER', 'STUDENT']),
  questionController.getAllQuestions
);
router.get(
  '/:id',
  authMiddleware,
  userTypeMiddleware(['TEACHER', 'STUDENT']),
  questionController.getQuestionById
);
router.delete(
  '/:id',
  authMiddleware,
  userTypeMiddleware(['TEACHER']),
  questionController.deleteQuestionById
);
router.put(
  '/:id',
  authMiddleware,
  userTypeMiddleware(['TEACHER']),
  questionController.updateQuestionById
);

module.exports = router;
