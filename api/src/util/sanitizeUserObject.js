const sanitizeUserObject = (user) => {
  user.email = user.credentials[0].email;

  delete user.credentials;

  return user;
};

module.exports = {
  sanitizeUserObject,
};
