require("./onStartup/dbConnection")
  .connectDB()
  .then(() => {
    const app = require("./app");
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
    console.log("Unable to connect to DB");
  });
