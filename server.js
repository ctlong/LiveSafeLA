const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use('/api', require('./controllers/crime.js'));

app.listen(port, () => console.log(`Listening on port ${port}`));
