const questionRouter = require('express').Router();
const questionController = require('../controllers/questionController');

questionRouter.post('/', questionController.createQuestion);
questionRouter.get('/', questionController.getAllQuestions);
questionRouter.get('/:id', questionController.getQuestionById);
questionRouter.delete('/:id', questionController.deleteQuestionById);
questionRouter.put('/:id', questionController.updateQuestionById);

module.exports = questionRouter;
