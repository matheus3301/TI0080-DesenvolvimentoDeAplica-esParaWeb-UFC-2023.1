const HttpStatus = require('http-status-codes').StatusCodes;

const userTypeMiddleware = (allowedTypes) => {
  return (req, res, next) => {
    const userType = req.userType;

    if (!userType || !allowedTypes.includes(userType)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ error: 'Usuário não autorizado a acessar recurso!' });
    }

    next();
  };
};

module.exports = userTypeMiddleware;
