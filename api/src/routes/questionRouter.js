const router = require('express').Router();
const questionController = require('../controllers/questionController');

router.post('/', questionController.createQuestion);
router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);
router.delete('/:id', questionController.deleteQuestionById);
router.put('/:id', questionController.updateQuestionById);

module.exports = router;
