import express from 'express';
import { createPassengerAccount } from '../../controllers';
import { editProfile } from '../../controllers/passenger/editProfile';
import { joinRide } from '../../controllers/passenger/joinRide';
import {
  isLoggedIn,
  validateExistingUser,
  validatePassengerLoginDetails,
  validateSignup,
} from '../../middleware';

const passengerRouter = express.Router();

passengerRouter.post(
  '/passenger/signup',
  validateSignup,
  validateExistingUser,
  createPassengerAccount
);
passengerRouter.post('/passenger/login', validatePassengerLoginDetails);
passengerRouter.put('/passenger/edit-profile', isLoggedIn, editProfile);
passengerRouter.post(
  '/passenger/ride-offers/offer/join-ride/:offerId',
  isLoggedIn,
  joinRide
);

export default passengerRouter;
