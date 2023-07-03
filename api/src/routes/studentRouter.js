const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');
const userTypeMiddleware = require('../middlewares/userTypeMiddleware');

router.post(
  '/',
  authMiddleware,
  userTypeMiddleware(['PRINCIPAL']),
  studentController.createStudent
);
router.get(
  '/',
  authMiddleware,
  userTypeMiddleware(['PRINCIPAL']),
  studentController.getAllStudents
);
router.get(
  '/me',
  authMiddleware,
  userTypeMiddleware(['STUDENT']),
  studentController.getPersonalInformation
);
router.get(
  '/me/enrollments',
  authMiddleware,
  userTypeMiddleware(['STUDENT']),
  studentController.getMyEnrollments
);
router.get(
  '/:id',
  authMiddleware,
  userTypeMiddleware(['PRINCIPAL']),
  studentController.getStudentById
);
router.put(
  '/:id',
  authMiddleware,
  userTypeMiddleware(['PRINCIPAL']),
  studentController.updateStudentById
);
router.delete(
  '/:id',
  authMiddleware,
  userTypeMiddleware(['PRINCIPAL']),
  studentController.deleteStudentById
);

module.exports = router;
