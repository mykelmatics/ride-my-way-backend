import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import driverRouter from './routes/driver/driverRoutes';
import userRouter from './routes/passenger/passengerRoutes';
import { allRideOfferRouter } from './routes/allOffer/allRideOffer';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/v1/user', userRouter);
app.use('/v1/user', driverRouter);
app.use('/v1/user', allRideOfferRouter);


app.use((err, req, res, next) => {
  res.status(400).json({ error: err.stack });
});

export default app;
