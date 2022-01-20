import Joi from 'joi';
import bcrypt from 'bcrypt';
import { driverModel, passengerModel } from '../controllers';
import jwt from 'jsonwebtoken';

export const validateExistingUser = async (req, res, next) => {
  const { email, phoneNumber } = req.body;
  try {
    const validateEmail = await passengerModel.select(
      '*',
      ` WHERE "email"= '${email}'`
    );
    const validatePhoneNumber = await passengerModel.select(
      '*',
      ` WHERE "phoneNumber"='${phoneNumber}'`
    );
    console.log(validateEmail.rowCount, 'root123');
    if (validateEmail.rowCount || validatePhoneNumber.rowCount) {
      return res.status(409).json({
        message: 'Email or PhoneNumber already Exist',
      });
    }
    return next();
  } catch (err) {
    return res.json({
      error: err,
    });
  }
};
export const validateExistingDriver = async (req, res, next) => {
  const { email, phoneNumber } = req.body;
  try {
    const validateEmail = await driverModel.select(
      '*',
      ` WHERE "email"= '${email}'`
    );
    const validatePhoneNumber = await driverModel.select(
      '*',
      ` WHERE "phoneNumber"='${phoneNumber}'`
    );
    if (validateEmail.rowCount || validatePhoneNumber.rowCount) {
      return res.status(409).json({
        message: 'Email or PhoneNumber already Exist',
      });
    }
    return next();
  } catch (err) {
    return res.json({
      error: err,
    });
  }
};

export const validatePassengerLoginDetails = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validateEmail = await passengerModel.select(
      '*',
      ` WHERE email = '${email}'`
    );
    if (!validateEmail.rowCount) {
      return res.status(400).json({
        message: 'Email or password not correct',
        success: false,
      });
    }
    const validatePassword = await bcrypt.compare(
      password,
      validateEmail.rows[0].password
    );
    if (validatePassword) {
      const { id, firstName, lastName, email } = validateEmail.rows[0];
      const userInfo = { id, firstName, lastName, email };
      const token = jwt.sign(
        {
          userInfo,
        },
        'welcomeuser',
        { expiresIn: '10h' }
      );
      return res.status(200).json({
        message: 'Login Successfully',
        userInfo,
        token,
      });
    }
    return res.status(404).json({
      message: 'Incorrect Email or Password',
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const validateDriverLoginDetails = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validateEmail = await driverModel.select(
      '*',
      ` WHERE email = '${email}'`
    );
    if (!validateEmail.rowCount) {
      return res.status(400).json({
        message: 'Email or password not correct',
        success: false,
      });
    }

    const validatePassword = await bcrypt.compare(
      password,
      validateEmail.rows[0].password
    );

    console.log(validatePassword, 'backend23');
    if (validatePassword) {
      const { id, firstName, lastName, email } = validateEmail.rows[0];
      const userInfo = { id, firstName, lastName, email };
      const token = jwt.sign(
        {
          userInfo,
        },
        'welcomeuser',
        { expiresIn: '10h' }
      );
      return res.status(200).json({
        message: 'Login Successfully',
        token,
      });
    }
    return res.status(404).json({
      message: 'Incorrect Email or Password',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'hello',
      success: false,
    });
  }
};

export const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  let tokenValue;
  try {
    if (token) {
      [, tokenValue] = token.split(' ');
      const userData = jwt.verify(tokenValue, 'welcomeuser');
      req.user = userData;
      if (userData) {
        next();
      } else {
        res.status(401).send({
          status: false,
          message: 'Authentication token is invalid or expired',
        });
      }
    } else {
      res.status(401).send({
        status: false,
        message: 'Authentication token does not exist',
      });
    }
  } catch (error) {
    res.status(401).send({
      status: false,
      message: 'Authentication token is invalid or expired',
    });
  }
};

export const validateSignup = async (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),

    lastName: Joi.string().min(3).max(30).required(),

    phoneNumber: Joi.string().length(11).required(),

    password: Joi.string().alphanum().min(6).max(12).required(),

    email: Joi.string().required(),
  });

  try {
    const value = await schema.validateAsync(req.body);
    const { password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);
    return next();
  } catch (err) {
    console.log(err);
    const errorMessage = err.details.map((error) => ({
      message: error.message,
    }));
    res.status(400).send(errorMessage);
  }
};
