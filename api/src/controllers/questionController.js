const prisma = require('../configuration/database');
const { Prisma } = require('@prisma/client');
const { removeQuestionAnswer } = require('../util/removeQuestionAnswer');
const HttpStatus = require('http-status-codes').StatusCodes;

const createQuestion = async (req, res) => {
  try {
    const { title, statement, choices, teacher } = req.body;

    const question = await prisma.question.create({
      data: {
        title,
        statement,
        teacher: {
          connect: {
            id: teacher,
          },
        },
        choices: {
          create: choices,
        },
      },
      include: {
        choices: true,
      },
    });

    res.json(question);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        res
          .status(HttpStatus.CONFLICT)
          .json({ error: 'Um usuário já existe com esse email' });
      }
    }
    console.error('Error creating question:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Falha ao criar questão' });
  }
};

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany({
      include: {
        choices: true,
      },
    });

    questionsWithoutAnswer = questions.map(removeQuestionAnswer);

    res.json(questions);
  } catch (error) {
    console.error('Error retrieving questions:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao listar questões' });
  }
};

// Get a single question by ID
const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await prisma.question.findUnique({
      where: { id: parseInt(id) },
      include: {
        choices: true,
      },
    });

    if (!question) {
      return res.status(404).json({ error: 'Questão não encontrada' });
    }
    questionWithoutAnswer = removeQuestionAnswer(question);

    res.json(questionWithoutAnswer);
  } catch (error) {
    console.error('Error retrieving question:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao carregar questão' });
  }
};

// Update a question by ID
const updateQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, statement, choices } = req.body;

    const question = await prisma.question.update({
      where: { id: parseInt(id) },
      data: {
        title,
        statement,
        choices: {
          upsert: choices.map((choice) => ({
            where: { id: choice.id || -1 },
            create: { content: choice.content },
            update: { content: choice.content },
          })),
        },
      },
      include: {
        choices: true,
      },
    });

    res.json(question);
  } catch (error) {
    console.error('Error updating question:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao atualizar questão' });
  }
};

// Delete a question by ID
const deleteQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.question.delete({
      where: { id: parseInt(id) },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting question:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Falha ao deletar questão' });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
};
