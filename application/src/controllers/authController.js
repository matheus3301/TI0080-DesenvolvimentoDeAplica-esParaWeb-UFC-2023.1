const api = require('../services/api');

const loginPage = (req, res) => {
  let { error } = req.query;

  res.render('login.njk', { error });
};

const handleLoginForm = async (req, res) => {
  let { email, password } = req.body;
  console.log(`[ ] login attempt with ${email} `);

  try {
    const response = await api.auth.login({ email, password });

    console.log(`[ ] login went sucessfully`);

    return res
      .cookie('token', response.token, {
        maxAge: 6.048e8,
        httpOnly: true,
      })
      .redirect('/');
  } catch (err) {
    console.log(`[x] error on login`);

    if (err.response) {
      res.redirect(
        `/login?error=${encodeURIComponent(err.response.data.error)}`
      );
    } else if (err.request) {
      res.redirect(
        `/login?error=${encodeURIComponent('Erro ao fazer login!')}`
      );
    } else {
      console.log(err);
      res.redirect(`/login?error=${encodeURIComponent('Erro desconhecido')}`);
    }
  }
};

module.exports = {
  loginPage,
  handleLoginForm,
};
