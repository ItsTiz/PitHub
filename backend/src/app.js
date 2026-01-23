import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

import carsRouter from './routes/cars-router.js'
import teamsRouter from './routes/teams-router.js'
import driversRouter from './routes/drivers-router.js'
import userRouter from './routes/user-router.js'

const swaggerDocument = YAML.load('./api-specs.yaml');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/cars', carsRouter);
app.use('/teams', teamsRouter);
app.use('/drivers', driversRouter);
app.use('/user', userRouter);

app.get('/', (_, res) => { res.redirect('/api-docs');});

export default app;
