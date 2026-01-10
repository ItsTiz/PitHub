import express from 'express';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';
import mongoose from 'mongoose';
import carRouter from './src/routes/carsRouter.js'
const swaggerDocument = YAML.load('./api-specs.yaml');
const rootUri = 'mongodb://localhost:27017/pithub';
const serverPort = 3000;

mongoose.connect(rootUri)
    .then(() => console.log('Connected to MongoDB successfully.'))
    .catch(err => console.log(err));

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/cars', carRouter);
app.get('/', (_, res) => {
    res.redirect('/api-docs');
});
app.listen(serverPort, () => console.log(`Server running on port ${serverPort}`));
