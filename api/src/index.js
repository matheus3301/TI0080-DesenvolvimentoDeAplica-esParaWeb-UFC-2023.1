const app = require('./configuration/app');

const port = process.env.PORT || 7777;
app.listen(port, () => {
  console.log(`[-] API running on ${port}`);
});
