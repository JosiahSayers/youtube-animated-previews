import express from 'express';
import cors from 'cors';

import restApiRouter from './Routers/rest-api.router';
import imageRouter from './Routers/image-proxy.router';

const app = express();

app.set('port', 3000);
app.use(cors());

app.use('/', imageRouter);
app.use('/api/v1', restApiRouter);

export default app;
