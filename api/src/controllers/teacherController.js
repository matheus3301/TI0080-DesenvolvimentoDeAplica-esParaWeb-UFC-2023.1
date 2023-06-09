const prisma = require('../configuration/database');
const { Prisma } = require('@prisma/client');
const HttpStatus = require('http-status-codes').StatusCodes;

// Create a new teacher
const createTeacher = async (req, res) => {
  try {
    const { name, cpf, email, password, confirmPassword, profilePictureUrl } =
      req.body;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Passwords do not match' });
    }

    const teacher = await prisma.teacher.create({
      data: {
        name,
        cpf,
        profilePictureUrl,
        credentials: {
          create: {
            email,
            password,
            type: 'TEACHER',
          },
        },
      },
    });

    res.json(teacher);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ error: 'Um usuário já existe com esse email' });
      }
    }
    console.error('Error creating teacher:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to create teacher' });
  }
};

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany();

    res.json(teachers);
  } catch (error) {
    console.error('Error retrieving teachers:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to retrieve teachers' });
  }
};

// Get a single teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await prisma.teacher.findUnique({
      where: { id: parseInt(id) },
    });

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json(teacher);
  } catch (error) {
    console.error('Error retrieving teacher:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to retrieve teacher' });
  }
};

// Update a teacher by ID
const updateTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cpf, email, password, profilePictureUrl } = req.body;

    const teacher = await prisma.teacher.update({
      where: { id: parseInt(id) },
      data: {
        name,
        cpf,
        email,
        password,
        profilePictureUrl,
      },
    });

    res.json(teacher);
  } catch (error) {
    console.error('Error updating teacher:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to update teacher' });
  }
};

// Delete a teacher by ID
const deleteTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.teacher.delete({
      where: { id: parseInt(id) },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to delete teacher' });
  }
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
};
