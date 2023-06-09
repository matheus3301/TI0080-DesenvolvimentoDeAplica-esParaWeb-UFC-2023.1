const removeQuestionAnswer = (question) => {
  for (let choice of question.choices) {
    delete choice.isCorrect;
  }

  return question;
};

module.exports = { removeQuestionAnswer };
