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

const getTeacherById = async (id) => {
  return useApi(`/teachers/${id}`);
};

const getAllTeachers= async () => {
  return useApi('/teachers');
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
  get_classes,
  get_class,
  getAllTeachers,
  getTeacherById,
  getAllStudents,
  getStudentById,
};
