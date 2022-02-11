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

/**
 * @swagger
 * /v1/passenger/signup:
 *   post:
 *     tags:
 *       - Passenger's & Authentication
 *     summary: Register a passenger.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *                description: The passenger firstName.
 *                example: Onafusi
 *              lastName:
 *                type: string
 *                description: The Passenger's lastname.
 *                example: lanre
 *              phoneNumber:
 *                type: string
 *                description: The passenger's phone number.
 *                example: 08156782345
 *              email:
 *                type: string
 *                description: The passenger's email.
 *                example: abdulkadir@gmail.com
 *              password:
 *                type: string
 *                description: Passsenger's password.
 *                example: helloabdulkadir
 *     responses:
 *       201:
 *         description: Account created successfully
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
 *                       description: passenger name
 *                       example: bossShehu
 *                     lastName:
 *                       type: string
 *                       description: passenger name
 *                       example: javascript
 *                     email:
 *                       type: string
 *                       description: passenger's email
 *                       example: mykelmatics@gmail.com
 *                 token:
 *                   type: string
 *                   description: pasenger's token
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
passengerRouter.post(
  '/passenger/signup',
  validateSignup,
  validateExistingUser,
  createPassengerAccount
);

/**
 * @swagger
 * /v1/passenger/login:
 *   post:
 *     tags:
 *       - Passenger's & Authentication
 *     summary: Login passenger.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The passenger's email
 *                 example: mykelmatics@gmail.com
 *               password:
 *                 type: string
 *                 description: passsenger's password
 *                 example: mykelmatics123
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
 *                 passenger:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Driver's ID
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       description: Passenger's firstName
 *                       example: Onafusi
 *                     email:
 *                       type: string
 *                       description: Passenger's email
 *                       example: mykelmatics@gmail.com
 *                 token:
 *                   type: string
 *                   description: passenger's token
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
passengerRouter.post('/passenger/login', validatePassengerLoginDetails);

/**
 * @swagger
 * /v1/passenger/profile:
 *   put:
 *     tags:
 *       - Passenger's & Authentication
 *     summary: Edit passenger profile.
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
 *                example: Onafusi
 *              lastName:
 *                type: string
 *                description: The user's lastNaae.
 *                example: Michael
 *              token:
 *                 type: string
 *                 description: Driver's token
 *                 example: dfgjklmnbvcxza.qwedsasdcvbfghjmnkjloiuhf.gvvcbncnmewq
 *     responses:
 *       201:
 *         description: Edit passenger's profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: string
 *                   description: success message
 *                   example: Profile edited successfully                
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
 */
passengerRouter.put('/passenger/profile', isLoggedIn, editProfile);



/**
 * @swagger
 * /v1/passenger/offers/join-ride/:offerId:
 *   post:
 *     tags:
 *       - Passenger's & Authentication
 *     summary: Edit passenger profile.
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
 *                example: Onafusi
 *              lastName:
 *                type: string
 *                description: The user's lastNaae.
 *                example: Michael
 *              token:
 *                 type: string
 *                 description: Driver's token
 *                 example: dfgjklmnbvcxza.qwedsasdcvbfghjmnkjloiuhf.gvvcbncnmewq
 *     responses:
 *       201:
 *         description: Edit passenger's profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: string
 *                   description: success message
 *                   example: Profile edited successfully                
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
 */

passengerRouter.post(
  '/passenger/offers/join-ride/:offerId',
  isLoggedIn,
  joinRide
);

export default passengerRouter;
