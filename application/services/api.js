const baseURL = 'http://localhost:7777';
const useApi = async (endpoint, method, body) => {
  const response = await fetch(baseURL + endpoint);

  return await response.json();
};

const get_questions = async (query) => {
  let questions_data = [];
  questions_data = await fetch(
    `http://localhost:7777/questions${query ? `?query=${query}` : ''}`
  );
  questions_data = await questions_data.json();
  return questions_data;
};

const get_question = async (id) => {
  let question_data = [];
  question_data = await fetch('http://localhost:7777/questions/' + id);
  question_data = await question_data.json();
  return question_data;
};

const get_teachers = async () => {
  let teachers_data = [];
  teachers_data = await fetch('http://localhost:7777/teachers');
  teachers_data = await teachers_data.json();
  return teachers_data;
};

const get_teacher = async (id) => {
  let teacher_data = [];
  teacher_data = await fetch('http://localhost:7777/teachers/' + id);
  teacher_data = await teacher_data.json();
  return teacher_data;
};

const get_classes = async () => {
  let classes_data = [];
  classes_data = await fetch('http://localhost:7777/classes');
  classes_data = await classes_data.json();
  return classes_data;
};

const get_class = async (id) => {
  let class_data = [];
  class_data = await fetch('http://localhost:7777/classes/' + id);
  class_data = await class_data.json();
  return class_data;
};

const getAllStudents = async () => {
  return useApi('/students');
};

const getStudentById = async (id) => {
  return useApi(`/students/${id}`);
};

module.exports = {
  get_questions,
  get_question,
  get_teachers,
  get_teacher,
  get_classes,
  get_class,
  getAllStudents,
  getStudentById,
};
