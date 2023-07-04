const { principal } = require('../services/api');

//TODO: Vitor - Implementar tela de dashboard para mostrar algo bonitim (dois cards para mostrar a quantidade de alunos e de professores)
const dashboardPage = async (req, res) => {
  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
  };

  res.render('principal/principal_dashboard.njk', content);
};

const teacherListPage = async (req, res) => {
  let teachers_data = await principal.getTeachers({ token: req.cookies.token });
  teachers_data.forEach((teacher) => {
    teacher.classes = teacher.classes.length;
  });

  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    teachers: true,
    teachers_data,
  };

  res.render('principal/principal_teachers.njk', content);
};

const createTeacherPage = async (req, res) => {
  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
  };

  res.render('principal/principal_teacher_view.njk', content);
};

const handleCreateTeacherForm = async (req, res) => {
  let { body } = req;
  let { token } = req.cookies;

  try {
    const response = await principal.createTeacher(body, token);
    res.redirect(
      `/principal/teachers?message=${encodeURIComponent(
        'Professor criado com sucesso!'
      )}`
    );
  } catch (err) {
    res.redirect(
      `/principal/teachers?error=${encodeURIComponent(err.response.data.error)}`
    );
  }
};

const handleUpdateTeacherForm = async (req, res) => {
  let { body } = req;
  let { token } = req.cookies;
  let { id } = req.params;

  try {
    const response = await principal.updateTeacher(id, body, token);
    res.redirect(
      `/principal/teachers?message=${encodeURIComponent(
        'Professor atualizado com sucesso!'
      )}`
    );
  } catch (err) {
    res.redirect(
      `/principal/teachers?error=${encodeURIComponent(err.response.data.error)}`
    );
  }
};

const handleDeleteTeacher = async (req, res) => {
  const { id } = req.params;
  let { token } = req.cookies;

  try {
    await principal.deleteTeacher(id, token);

    res.redirect(
      `/principal/teachers?message=${encodeURIComponent(
        'Professor deletado com sucesso!'
      )}`
    );
  } catch (err) {
    res.redirect(
      `/principal/teachers?error=${encodeURIComponent(err.response.data.error)}`
    );
  }
};

const viewTeacherPage = async (req, res) => {
  const { id } = req.params;

  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    teacher: await principal.getTeacherById({ token: req.cookies.token, id }),
  };

  res.render('principal/principal_teacher_view.njk', content);
};

const studentListPage = async (req, res) => {
  let students_data = await principal.getStudents({ token: req.cookies.token });
  students_data.forEach((student) => {
    student.enrollments = student.enrollments.length;
  });

  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    students: true,
    students_data,
  };

  res.render('principal/principal_students.njk', content);
};

const createStudentPage = async (req, res) => {
  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
  };

  res.render('principal/principal_student_view.njk', content);
};

const handleCreateStudentForm = async (req, res) => {
  let { body } = req;
  let { token } = req.cookies;

  try {
    const response = await principal.createStudent(body, token);
    res.redirect(
      `/principal/students?message=${encodeURIComponent(
        'Estudante criado com sucesso!'
      )}`
    );
  } catch (err) {
    res.redirect(
      `/principal/students?error=${encodeURIComponent(err.response.data.error)}`
    );
  }
};

const handleUpdateStudentForm = async (req, res) => {
  let { body } = req;
  let { token } = req.cookies;
  let { id } = req.params;

  try {
    const response = await principal.updateStudent(id, body, token);
    res.redirect(
      `/principal/students?message=${encodeURIComponent(
        'Estudante atualizado com sucesso!'
      )}`
    );
  } catch (err) {
    res.redirect(
      `/principal/students?error=${encodeURIComponent(err.response.data.error)}`
    );
  }
};

const handleDeleteStudent = async (req, res) => {
  const { id } = req.params;
  let { token } = req.cookies;

  try {
    await principal.deleteStudent(id, token);

    res.redirect(
      `/principal/students?message=${encodeURIComponent(
        'Estudante deletado com sucesso!'
      )}`
    );
  } catch (err) {
    res.redirect(
      `/principal/students?error=${encodeURIComponent(err.response.data.error)}`
    );
  }
};

const viewStudentPage = async (req, res) => {
  const { id } = req.params;

  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    student: await principal.getStudentById({ token: req.cookies.token, id }),
  };

  res.render('principal/principal_student_view.njk', content);
};

module.exports = {
  dashboardPage,
  teacherListPage,
  createTeacherPage,
  viewTeacherPage,
  studentListPage,
  createStudentPage,
  handleDeleteStudent,
  handleUpdateStudentForm,
  viewStudentPage,
  handleCreateStudentForm,
  handleCreateTeacherForm,
  handleDeleteTeacher,
  handleUpdateTeacherForm,
};
