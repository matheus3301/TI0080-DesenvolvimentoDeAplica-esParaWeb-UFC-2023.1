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
  updateStudent: async (id, body, token) => {
    let response = await instance.put(`/students/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  deleteStudent: async (id, token) => {
    let response = await instance.delete(`/students/${id}`, {
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

const student = {
  enrollOnClass: async (id, token) => {
    let response = await instance.post(`/classes/${id}/enroll`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  exitClass: async (id, token) => {
    let response = await instance.delete(`/classes/${id}/enroll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  getPersonalInformation: async ({ token }) => {
    let response = await instance.get('/students/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  getMyEnrollments: async ({ token }) => {
    let response = await instance.get('/students/me/enrollments', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  getClass: async (id, token) => {
    let response = await instance.get(`/classes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  searchForClasses: async (query, token) => {
    let response;
    if (query) {
      response = await instance.get(
        `/classes?query=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      response = await instance.get(`/classes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return response.data;
  },
};

const teacher = {
  getPersonalInformation: async ({ token }) => {
    let response = await instance.get('/teachers/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
};

module.exports = {
  auth,
  principal,
  student,
  teacher,
};
