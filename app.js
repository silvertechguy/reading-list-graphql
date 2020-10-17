const express = require("express");

const app = express();

const PORT = process.env.PORT || process.env.port || 400;
app.listen(PORT, () =>
  console.log(`Now listening for requests on port ${PORT}`)
);
