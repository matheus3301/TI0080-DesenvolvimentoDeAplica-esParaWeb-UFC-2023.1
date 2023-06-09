const app = require('./configuration/app');

const port = process.env.PORT || 7777;
app.listen(port, () => {
  console.log(`[-] app running on ${port}`);
});
