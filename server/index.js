const express = require('express');
const graphHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');
const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoURI).then(() => {
	console.log('Connected to db');
});

app.use(
	'/graphql',
	graphHTTP({
		schema,
		graphiql: true,
	})
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log('Server running on port ' + port);
});
