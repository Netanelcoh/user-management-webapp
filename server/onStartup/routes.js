const express = require("express");
const cors = require("cors");
const userRoutes = require("../routes/userRoutes");

const loadMiddlewares = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use("/api/users", userRoutes);
};

module.exports = { loadMiddlewares };
