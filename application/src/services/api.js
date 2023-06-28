const axios = require('axios').default;
const baseURL = 'http://localhost:7777';

const instance = axios.create({
  baseURL,
  timeout: 5000,
});

const auth = {
  login: async ({ email, password }) => {
    let response = await instance.post('/auth/login', { email, password });
    return response.data;
  },

  validate: async ({ token }) => {
    let response = await instance.post('/auth/validate', { token });
    return response.data;
  },
};

// const useApi = async (endpoint, method, body) => {
//   const response = await fetch(baseURL + endpoint);

//   return await response.json();
// };

// const getQuestions = async (query) => {
//   return useApi(`/questions${query ? `?query=${query}` : ''}`);
// };

// const getQuestionByID = async (id) => {
//   return useApi(`/questions/${id}`);
// };

// const getTeacherById = async (id) => {
//   return useApi(`/teachers/${id}`);
// };

// const getAllTeachers = async () => {
//   return useApi('/teachers');
// };

// const getAllClasses = async () => {
//   return useApi(`/classes/`);
// };

// const getClassByID = async (id) => {
//   return useApi(`/classes/${id}`);
// };

// const getAllStudents = async () => {
//   return useApi('/students');
// };

// const getStudentById = async (id) => {
//   return useApi(`/students/${id}`);
// };

module.exports = {
  auth,
};
