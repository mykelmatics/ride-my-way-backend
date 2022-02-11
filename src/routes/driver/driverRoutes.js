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
/**
 * @swagger
 * /v1/driver/signup:
 *   post:
 *     tags:
 *       - Drivers & Authentication
 *     summary: Add a new driver.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *                description: The user firstName.
 *                example: Abdulkadir
 *              lastName:
 *                type: string
 *                description: The user's lastNaae.
 *                example: Abdullah
 *              phoneNumber:
 *                type: string
 *                description: The user's phone number.
 *                example: 08044444444
 *              email:
 *                type: string
 *                description: The user's email.
 *                example: abdulkadir@gmail.com
 *              password:
 *                type: string
 *                description: User's password.
 *                example: helloabdulkadir
 *     responses:
 *       201:
 *         description: Driver created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Driver ID
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       description: driver name
 *                       example: bossShehu
 *                     lastName:
 *                       type: string
 *                       description: driver name
 *                       example: javascript
 *                     email:
 *                       type: string
 *                       description: Driver's email
 *                       example: abdulkadir@gmail.com
 *                 token:
 *                   type: string
 *                   description: Driver's token
 *                   example: dfgjklmnbvcxzaqwedsasdcvbfghjmnkjloiuhfgvvcbncnmewqedncbcvfggfhjfjjjkk          
 *       409:
 *         description: Conflict on the user's input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Conflict
 *                   example: Email or password already exist
 *                 success:
 *                  type: boolean
 *                  description: false
 *                  example: false         
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Internal server error
 *                   example: Internal server error
 *                 success:
 *                   type: boolean
 *                   description: false
 *                   example: false
 */
driverRouter.post(
  '/driver/signup',
  validateSignup,
  validateExistingDriver,
  createDriverAccount
);
/**
 * @swagger
 * /v1/driver/login:
 *   post:
 *     tags:
 *       - Drivers & Authentication
 *     summary: Login driver.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: abdulkadir@gmail.com
 *               password:
 *                 type: string
 *                 description: Driver's password
 *                 example: helloabdulkadir
 *     responses:
 *       200:
 *         description: Success Logged in message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Logged in successfully
 *                   example: Logged in successfully
 *                 driver:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Driver's ID
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       description: Driver's firstName
 *                       example: Abdulkadir
 *                     email:
 *                       type: string
 *                       description: Driver's email
 *                       example: abdulkadir@gmail.com
 *                 token:
 *                   type: string
 *                   description: Driver's token
 *                   example: asdfghjklmnbvcxzqwertyuioplkjhgfdsxcvbnmkioltgvedcwsxzaqwertkjhgsapoiu
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Not found
 *                   example: Email or password not found
 *                 success:
 *                  type: boolean
 *                  description: false
 *                  example: false
 *       409:
 *         description: Conflict on the user's input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Conflict
 *                   example: Email or password already exist
 *                 success:
 *                  type: boolean
 *                  description: false
 *                  example: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Internal server error
 *                   example: Internal server error
 *                 success:
 *                  type: boolean
 *                  description: false
 *                  example: false
*/
driverRouter.post('/driver/login', validateDriverLoginDetails);

driverRouter.post('/driver/offer', isLoggedIn, addRide);
driverRouter.delete('/driver/:offerId', isLoggedIn, deleteRideOffer);
driverRouter.get('/driver/offers', isLoggedIn, createdOffer);
driverRouter.put(
  '/driver/offers/:offerId',
  isLoggedIn,
  editRideOffer
);
driverRouter.put('/driver/profile', isLoggedIn, editProfile);

export default driverRouter;
