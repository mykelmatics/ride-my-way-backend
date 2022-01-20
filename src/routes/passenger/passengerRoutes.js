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

const userRouter = express.Router();

userRouter.post(
  '/passenger/signup',
  validateSignup,
  validateExistingUser,
  createPassengerAccount
);
userRouter.post('/passenger/login', validatePassengerLoginDetails);
userRouter.put('/passenger/edit-profile', isLoggedIn, editProfile);
userRouter.post('/passenger/join-ride/:offerId', isLoggedIn, joinRide);

export default userRouter;
