const prisma = require('../configuration/database');
const { Prisma } = require('@prisma/client');
const HttpStatus = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  let { email, password } = req.body;

  email = email.trim();
  password = password.trim();

  const user = await prisma.credentials.findFirst({
    where: {
      email: {
        equals: email,
      },
      password: {
        equals: password,
      },
    },
  });

  if (!user) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      error: 'Email ou senha inválidos',
    });
  }

  let userId = user.adminId;
  if (user.type == 'TEACHER') {
    userId = user.teacherId;
  } else if (user.type == 'STUDENT') {
    userId = user.studentId;
  }

  const token = jwt.sign(
    {
      userType: user.type,
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );

  res.json({
    access_token: token,
    userId,
    userType: user.type,
  });
};

module.exports = {
  login,
};
