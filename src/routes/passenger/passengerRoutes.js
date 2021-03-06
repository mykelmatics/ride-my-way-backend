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
passengerRouter.put('/passenger/profile', isLoggedIn, editProfile);
passengerRouter.post(
  '/passenger/offers/join-ride/:offerId',
  isLoggedIn,
  joinRide
);

export default passengerRouter;
