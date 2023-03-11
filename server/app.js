const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// connect to database
// make sure to replace my db string & creds with your own
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV ===  "development" ? true : false,
  })
);


const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Server is running on port ${PORT}`);
});
