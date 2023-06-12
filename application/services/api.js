const get_all_questions = async () => {
  let questions_data = [];
  questions_data = await fetch("http://localhost:7777/questions");
  questions_data = await questions_data.json();
  return questions_data;
};

const get_question = async (id) => {
  let question_data = [];
  question_data = await fetch("http://localhost:7777/questions/:" + id);
  question_data = await question_data.json();
  return question_data;
};

module.exports = { get_all_questions, get_question };
