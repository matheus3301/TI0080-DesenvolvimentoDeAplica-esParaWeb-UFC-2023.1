const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.post('/', classController.createClass);
router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.put('/:id', classController.updateClassById);
router.delete('/:id', classController.deleteClassById);

router.post('/:classId/enroll', classController.enrollOnClass);

module.exports = router;
