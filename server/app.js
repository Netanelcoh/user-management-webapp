const express = require("express");
const dbConnection = require("./onStartup/dbConnection");
const app = express();

dbConnection()
  .then(() => {
    const port = process.env.PORT || 3000;
    require("./onStartup/routes")(app);

    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  })
  .catch((error) => {
    //load default view when error
    console.log(error);
  });
