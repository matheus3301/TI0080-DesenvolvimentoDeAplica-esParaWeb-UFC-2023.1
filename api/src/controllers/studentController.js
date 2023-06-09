const prisma = require('../configuration/database');
const { Prisma } = require('@prisma/client');
const HttpStatus = require('http-status-codes').StatusCodes;

const createStudent = async (req, res) => {
  try {
    const { name, profilePictureUrl, email, password, confirmPassword } =
      req.body;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Senha não confere' });
    }

    const student = await prisma.student.create({
      name,
      profilePictureUrl,
      credentials: {
        create: {
          email,
          password,
          type: 'STUDENT',
        },
      },
    });

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
    const students = await prisma.student.findMany();

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

    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Error retrieving student:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao carregar estudante' });
  }
};

const updateStudentById = async (req, res) => {
  res.status(HttpStatus.NOT_IMPLEMENTED).json({
    error: 'Funcionalidade ainda não implementada',
  });
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
