const dashboardPage = async (req, res) => {
  let content = {
    error: req.query,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
  };

  res.render('student/student_dashboard.njk', content);
};

module.exports = {
  dashboardPage,
};
