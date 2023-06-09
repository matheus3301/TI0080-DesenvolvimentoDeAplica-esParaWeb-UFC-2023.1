const express = require('express');
const teacherRouter = express.Router();
const teacherController = require('../controllers/teacherController');

teacherRouter.post('/', teacherController.createTeacher);
teacherRouter.get('/', teacherController.getAllTeachers);
teacherRouter.get('/:id', teacherController.getTeacherById);
teacherRouter.put('/:id', teacherController.updateTeacherById);
teacherRouter.delete('/:id', teacherController.deleteTeacherById);

module.exports = teacherRouter;
