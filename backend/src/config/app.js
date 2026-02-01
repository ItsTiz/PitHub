import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

import carsRouter from '../routes/cars-router.js'
import teamsRouter from '../routes/teams-router.js'
import driversRouter from '../routes/drivers-router.js'
import userRouter from '../routes/user-router.js'

import { sseMiddleware, handleSSE } from '../config/sse.js';

const swaggerDocument = YAML.load('./api-specs.yaml');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/v1/cars', carsRouter);
app.use('/v1/teams', teamsRouter);
app.use('/v1/drivers', driversRouter);
app.use('/v1/users', userRouter);

app.get('/', (_, res) => { res.redirect('/api-docs');});

app.get('/notifications', sseMiddleware, handleSSE);

export default app;
