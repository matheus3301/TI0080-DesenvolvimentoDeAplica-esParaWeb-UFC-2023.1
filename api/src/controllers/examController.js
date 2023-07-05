const prisma = require('../configuration/database');
const { Prisma } = require('@prisma/client');
const HttpStatus = require('http-status-codes').StatusCodes;

const createExam = async (req, res) => {
  let { title, questions } = req.body;
  let { userId } = req;

  try {
    const exam = await prisma.exam.create({
      data: {
        title,
        teacher: {
          connect: {
            id: userId,
          },
        },
        questions: {
          connect: questions
        },
      },
      include: {
        teacher: true,
        questions: {
          include: {
            choices: true,
          },
        },
      },
    });

    return res.status(HttpStatus.CREATED).json(exam);
  } catch (err) {
    console.error('Error creating exam:', err);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Falha ao criar teste' });
  }
};

const deleteExamById = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.exam.delete({
      where: { id: parseInt(id) },
    });

    res.sendStatus(HttpStatus.NO_CONTENT);
  } catch (error) {
    console.error('Error deleting exam:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Falha ao deletar teste' });
  }
};

const getExamById = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await prisma.exam.findUnique({
      where: { id: parseInt(id) },
      include: {
        teacher: true,
        questions: true,
      },
    });

    if (!exam) {
      return res.status(404).json({ error: 'Teste não encontrado' });
    }

    res.json(exam);
  } catch (error) {
    console.error('Error retrieving exam:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao carregar teste' });
  }
};

const getAllExams = async (req, res) => {
  try {
    let questions = await prisma.exam.findMany({
      include: {
        questions: true,
        teacher: true,
      },
    });

    res.json(questions);
  } catch (error) {
    console.error('Error retrieving exams:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao listar questões' });
  }
};

module.exports = {
  createExam,
  deleteExamById,
  getExamById,
  getAllExams,
};
