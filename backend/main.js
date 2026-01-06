const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rootUri = 'mongodb://localhost:27017/pithub';
const serverPort = 5000;

mongoose.connect(rootUri)
   .then(() => console.log('Connected to MongoDB successfully.'))
   .catch(err => console.log(err));

const app = express();

app.use('/',[express.json(), cors()]);
app.get('/', (req, res) => {
  res.send('PitHub Backend Running...');
});
app.listen(serverPort, () => console.log(`Server running on port ${serverPort}`));
