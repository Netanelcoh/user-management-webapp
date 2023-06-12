const express = require("express");
const app = express();
require("./onStartup/routes").loadMiddlewares(app);

module.exports = app;
