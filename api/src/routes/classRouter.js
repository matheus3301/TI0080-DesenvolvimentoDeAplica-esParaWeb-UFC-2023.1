const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const authMiddleware = require('../middlewares/authMiddleware');
const userTypeMiddleware = require('../middlewares/userTypeMiddleware');

router.post(
  '/',
  authMiddleware,
  userTypeMiddleware(['TEACHER']),
  classController.createClass
);
router.get(
  '/',
  authMiddleware,
  userTypeMiddleware(['TEACHER', 'STUDENT']),
  classController.getAllClasses
);
router.get(
  '/:id',
  authMiddleware,
  userTypeMiddleware(['TEACHER', 'STUDENT']),
  classController.getClassById
);

router.put(
  '/:id',
  authMiddleware,
  userTypeMiddleware(['TEACHER']),
  classController.updateClassById
);
router.delete(
  '/:id',
  authMiddleware,
  userTypeMiddleware(['TEACHER']),
  classController.deleteClassById
);

router.post(
  '/:classId/enroll',
  authMiddleware,
  userTypeMiddleware(['STUDENT']),
  classController.enrollOnClass
);

module.exports = router;
