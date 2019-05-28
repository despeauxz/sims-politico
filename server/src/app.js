/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import debug from 'debug';
import logger from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import apiRoutes from './routes';
import errorHandler from './middlewares/errorHandler';

console.log(process.env.NODE_ENV);

const debugged = debug('app');
config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
    credentials: true
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//  Connect all our routes to our application
app.use('/api', apiRoutes);

app.use('/api/v1/docs', express.static('server/docs'));

// Default catch-all route that sends warning for wrong api routes.
app.use('/api/*', (req, res) => res.status(409).send({
    status: 409,
    message: 'Where Are You Going? Page Not Found'
}));

app.use(errorHandler);

app.listen(port, () => {
    debugged(`Listening from port ${port}`);
});

export default app;
