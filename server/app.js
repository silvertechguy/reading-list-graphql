require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require("./schema/schema");

const app = express();

app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((conn) => console.log(`MongoDB Connected: ${conn.connection.host}`))
  .catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const PORT = process.env.PORT || process.env.port || 4000;
app.listen(PORT, () =>
  console.log(`Now listening for requests on port ${PORT}`)
);
