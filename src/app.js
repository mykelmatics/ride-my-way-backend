import logger from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import express from 'express';
import cookieParser from 'cookie-parser';
import driverRouter from './routes/driver/driverRoutes';
import passengerRouter from './routes/passenger/passengerRoutes';
import { allRideOfferRouter } from './routes/allOffer/allRideOffer';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/v1', passengerRouter);
app.use('/v1', driverRouter);
app.use('/v1/user', allRideOfferRouter);

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.stack });
});


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Ride My Way App',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/driver/*.js', './src/routes/passenger/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


export default app;
