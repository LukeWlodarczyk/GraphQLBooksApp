const express = require('express');
const graphHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Book');
require('./models/Author');

const schema = require('./schema/schema');
const keys = require('./config/keys');

const app = express();

app.use(cors());

mongoose
	.connect(
		keys.mongoURI,
		{ useNewUrlParser: true }
	)
	.then(() => {
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
