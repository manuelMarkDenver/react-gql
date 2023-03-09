const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// connect to database
// make sure to replace my db string & creds with your own
mongoose.connect('mongodb+srv://mhackeesrdev:test1234@cluster0.ly6zm0z.mongodb.net/test');
mongoose.connection.once('open', () => {
    console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 4000

app.listen(4000, () => {
    console.log(`Server is running on port ${PORT}`);
});