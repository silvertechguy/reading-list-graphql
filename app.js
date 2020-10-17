const express = require("express");
const graphqlHTTP = require("express-graphql");

const app = express();

app.use("/graphql", graphqlHTTP({}));

const PORT = process.env.PORT || process.env.port || 400;
app.listen(PORT, () =>
  console.log(`Now listening for requests on port ${PORT}`)
);
