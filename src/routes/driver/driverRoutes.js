import express from 'express';
import { deleteRideOffer } from '../../controllers/driver/deleteOffer';
import { editRideOffer } from '../../controllers/driver/editOffer';
import { editProfile } from '../../controllers/driver/editProfile';
import { addRide, createdOffer } from '../../controllers/driver/rideOffer';

import { createDriverAccount } from '../../controllers/driver/signUp';
import {
  isLoggedIn,
  validateDriverLoginDetails,
  validateExistingDriver,
  validateSignup,
} from '../../middleware';

const driverRouter = express.Router();

driverRouter.post(
  '/driver/signup',
  validateSignup,
  validateExistingDriver,
  createDriverAccount
);
driverRouter.post('/driver/login', validateDriverLoginDetails);
driverRouter.post('/driver/create', isLoggedIn, addRide);
driverRouter.delete(
  '/driver/delete-ride-offer/:offerId',
  isLoggedIn,
  deleteRideOffer
);
driverRouter.get('/driver/created-offer', isLoggedIn, createdOffer);
driverRouter.put('/driver/edit-offer/:offerId', isLoggedIn, editRideOffer);
driverRouter.put('/driver/edit-profile', isLoggedIn, editProfile);

export default driverRouter;