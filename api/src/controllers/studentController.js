const prisma = require('../configuration/database');
const { Prisma } = require('@prisma/client');
const HttpStatus = require('http-status-codes').StatusCodes;
const { sanitizeUserObject } = require('../util/sanitizeUserObject');

const createStudent = async (req, res) => {
  try {
    let { name, profilePictureUrl, email, password, confirmPassword } =
      req.body;

    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Senha não confere' });
    }

    let student = await prisma.student.create({
      data: {
        name,
        profilePictureUrl,
        credentials: {
          create: {
            email,
            password,
            type: 'STUDENT',
          },
        },
      },
      include: {
        credentials: true,
      },
    });

    student = sanitizeUserObject(student);

    res.json(student);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ error: 'Um usuário já existe com esse email' });
      }
    }
    console.error('Error creating student:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao criar estudante' });
  }
};

const getAllStudents = async (req, res) => {
  try {
    let students = await prisma.student.findMany({
      include: {
        enrollments: true,
        credentials: true,
      },
    });

    students = students.map(sanitizeUserObject);

    res.json(students);
  } catch (error) {
    console.error('Error retrieving students:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao listar professores' });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    let student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
      include: {
        enrollments: true,
        credentials: true,
      },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    student = sanitizeUserObject(student);

    res.json(student);
  } catch (error) {
    console.error('Error retrieving student:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao carregar estudante' });
  }
};

const updateStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, profilePictureUrl } = req.body;

    let credentials = await prisma.credentials.updateMany({
      data: {
        email: email,
      },
      where: {
        studentId: parseInt(id),
      },
    });

    let updated = await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        profilePictureUrl,
        name,
      },
      include: {
        enrollments: true,
        credentials: true,
      },
    });

    updated = sanitizeUserObject(updated);

    res.status(HttpStatus.OK).json(updated);
  } catch (error) {
    console.error('Error updating teacher:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao atualizar professor' });
  }
};

const deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.student.delete({
      where: { id: parseInt(id) },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting student:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao deletar estudante' });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
