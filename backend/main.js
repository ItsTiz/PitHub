const express = require('express');
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = YAML.load('./api-specs.yaml');
const cors = require('cors');
const mongoose = require('mongoose');
const rootUri = 'mongodb://localhost:27017/pithub';
const serverPort = 3000;

mongoose.connect(rootUri)
   .then(() => console.log('Connected to MongoDB successfully.'))
   .catch(err => console.log(err));

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});
app.listen(serverPort, () => console.log(`Server running on port ${serverPort}`));
