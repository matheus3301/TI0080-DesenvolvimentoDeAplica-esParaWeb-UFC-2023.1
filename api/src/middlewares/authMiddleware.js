const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes').StatusCodes;

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Token de autorização não enviado' });
  }

  token = token.split(' ');
  if (token.length != 2) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Token de autorização inválido' });
  }

  token = token[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Token de autorização inválido' });
    }

    req.userId = decoded.userId;
    req.userType = decoded.userType;

    next();
  });
};

module.exports = authMiddleware;
