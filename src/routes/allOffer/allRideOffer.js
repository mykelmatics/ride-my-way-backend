import express from 'express';
import { rideOffers } from '../../controllers/rideOffers/rideOffers';


export const allRideOfferRouter = express.Router();

allRideOfferRouter.get('/all-ride-offer', rideOffers);

