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
driverRouter.post('/driver/add-offer', isLoggedIn, addRide);
driverRouter.delete('/driver/offers/:offerId', isLoggedIn, deleteRideOffer);
driverRouter.get('/driver/offers/created-offer', isLoggedIn, createdOffer);
driverRouter.put(
  '/driver/offers/edit-offer/:offerId',
  isLoggedIn,
  editRideOffer
);
driverRouter.put('/driver/edit-profile', isLoggedIn, editProfile);

export default driverRouter;
