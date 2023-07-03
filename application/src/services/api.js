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
    let response = await instance.post('/auth/validate', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

const principal = {
  getPersonalInformation: async ({ token }) => {
    let response = await instance.get('/principals/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  createTeacher: async (body, token) => {
    let response = await instance.post('/teachers', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  deleteTeacher: async (id, token) => {
    let response = await instance.delete(`/teachers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  updateTeacher: async (id, body, token) => {
    let response = await instance.put(`/teachers/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  getTeachers: async ({ token }) => {
    let response = await instance.get('/teachers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  getTeacherById: async ({ id, token }) => {
    let response = await instance.get(`/teachers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  createStudent: async (body, token) => {
    let response = await instance.post('/students', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  getStudents: async ({ token }) => {
    let response = await instance.get('/students', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  getStudentById: async ({ id, token }) => {
    let response = await instance.get(`/students/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
  principal,
};
