const sanitizeUserObject = (user) => {
  for (credentials of user.credentials) {
    user.email = credentials.email;
  }

  delete user.credentials;

  return user;
};

module.exports = {
  sanitizeUserObject,
};
