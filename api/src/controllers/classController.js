const prisma = require('../configuration/database');
const { Prisma } = require('@prisma/client');
const HttpStatus = require('http-status-codes').StatusCodes;

const createClass = async (req, res) => {
  try {
    const { title, description, teacher } = req.body;

    const classs = await prisma.class.create({
      data: {
        title,
        description,
        teacher: {
          connect: {
            id: teacher,
          },
        },
      },
    });

    res.json(classs);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ error: 'Já existe uma turma com esse nome' });
      }
    }

    console.error('Error creating class:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao criar classe' });
  }
};

const getAllClasses = async (req, res) => {
  try {
    const classes = await prisma.class.findMany({
      include: {
        teacher: true,
        enrollments: true,
      },
    });

    res.json(classes);
  } catch (error) {
    console.error('Error retrieving classes:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao listar classes' });
  }
};

const getClassById = async (req, res) => {
  try {
    const { id } = req.params;

    const clz = await prisma.class.findUnique({
      where: { id: parseInt(id) },
      include: {
        teacher: true,
        enrollments: true,
      },
    });

    if (!clz) {
      return res.status(404).json({ error: 'Classe não encontrada' });
    }

    res.json(clz);
  } catch (error) {
    console.error('Error retrieving class:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao carregar classe' });
  }
};

const updateClassById = async (req, res) => {
  res.status(HttpStatus.NOT_IMPLEMENTED).json({
    error: 'Funcionalidade ainda não implementada',
  });
};

const deleteClassById = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.class.delete({
      where: { id: parseInt(id) },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting class:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Falha ao deletar classe' });
  }
};

const enrollOnClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { studentId } = req.body;

    const enrollment = prisma.enrollment.create({
      data: {
        class: {
          connect: {
            id: classId,
          },
        },
        student: {
          connect: {
            id: studentId,
          },
        },
      },
    });

    res.json(enrollment);
  } catch (error) {
    console.log(```Error enrolling on class ${classId}```);

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Falha ao se matricular na turma',
    });
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClassById,
  deleteClassById,
  enrollOnClass,
};
