const express = require('express');
const graphHTTP = require('express-graphql');

const app = express();

app.use('/graphql', graphHTTP({}));

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log('Server running on port ' + port);
});
