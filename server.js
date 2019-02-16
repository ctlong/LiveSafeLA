const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/search', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
