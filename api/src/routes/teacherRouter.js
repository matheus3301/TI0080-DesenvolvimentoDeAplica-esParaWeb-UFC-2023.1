const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');
const userTypeMiddleware = require('../middlewares/userTypeMiddleware');

router.post(
  '/',
  authMiddleware,
  userTypeMiddleware(['PRINCIPAL']),
  teacherController.createTeacher
);
router.get(
  '/',
  authMiddleware,
  userTypeMiddleware(['PRINCIPAL']),
  teacherController.getAllTeachers
);
router.get(
  '/me',
  authMiddleware,
  userTypeMiddleware(['TEACHER']),
  teacherController.getPersonalInformation
);
router.get(
  '/me/exams',
  authMiddleware,
  userTypeMiddleware(['TEACHER']),
  teacherController.getMyExams
);
router.get(
  '/me/classes',
  authMiddleware,
  userTypeMiddleware(['TEACHER']),
  teacherController.getMyClasses
);
router.get(
  '/:id',
  authMiddleware,
  userTypeMiddleware(['PRINCIPAL']),
  teacherController.getTeacherById
);
router.put(
  '/:id',
  authMiddleware,
  userTypeMiddleware(['PRINCIPAL']),
  teacherController.updateTeacherById
);
router.delete(
  '/:id',
  authMiddleware,
  userTypeMiddleware(['PRINCIPAL']),
  teacherController.deleteTeacherById
);

module.exports = router;
