const checkUserTypeMiddleware = (allowedTypes) => {
  return (req, res, next) => {
    const userType = req.userType;

    if (!userType || !allowedTypes.includes(userType)) {
      return res.redirect('/');
    }

    next();
  };
};

module.exports = checkUserTypeMiddleware;
