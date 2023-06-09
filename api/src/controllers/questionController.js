const prisma = require('../configuration/database');

const createQuestion = async (req, res) => {
  try {
    const { title, statement, choices, teacher } = req.body;

    const question = await prisma.question.create({
      data: {
        title,
        statement,
        teacher: teacher,
        choices: {
          create: choices.map((choice) => ({ content: choice })),
        },
      },
      include: {
        choices: true,
      },
    });

    res.json(question);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Failed to create question' });
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

    res.json(questions);
  } catch (error) {
    console.error('Error retrieving questions:', error);
    res.status(500).json({ error: 'Failed to retrieve questions' });
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
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json(question);
  } catch (error) {
    console.error('Error retrieving question:', error);
    res.status(500).json({ error: 'Failed to retrieve question' });
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
    res.status(500).json({ error: 'Failed to update question' });
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
    res.status(500).json({ error: 'Failed to delete question' });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
};
