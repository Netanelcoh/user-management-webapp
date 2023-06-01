const express = require("express");
const app = express();

require("./onStartup/dbConnection")();
require("./onStartup/routes")(app);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

module.exports = server;
