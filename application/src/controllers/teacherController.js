const dashboardPage = async (req, res) => {
  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    dashboard: true,
  };

  res.render('teacher/teacher_dashboard.njk', content);
};

module.exports = {
  dashboardPage,
};
