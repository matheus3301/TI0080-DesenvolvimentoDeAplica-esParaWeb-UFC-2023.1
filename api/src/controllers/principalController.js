const prisma = require('../configuration/database');
const { Prisma } = require('@prisma/client');
const HttpStatus = require('http-status-codes').StatusCodes;

const getPersonalInformation = async (req, res) => {
  try {
    const { userId } = req;

    const principal = await prisma.admin.findUnique({
      where: {
        id: userId,
      },
    });

    return res.json(principal);
  } catch (err) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Erro ao consultar dados do diretor!',
    });
  }
};

module.exports = {
  getPersonalInformation,
};
