const server = require('./configuration/server');

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`[-] app running on ${port}`);
});
