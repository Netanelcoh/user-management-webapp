const express = require("express");
const userRoutes = require("../routes/userRoutes");

function loadMiddleware(app) {
  app.use(express.json());
  // //app.use(cors());
  app.use("/api/users", userRoutes);
}

module.exports = loadMiddleware;
