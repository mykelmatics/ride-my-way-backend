import Model from '../../models/model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

export const passengerModel = new Model('passenger');

export const createPassengerAccount = async (req, res) => {
  const { firstName, lastName, phoneNumber, password, email } = req.body;
  const columns = '"firstName", "lastName", "phoneNumber", "password", "email"';
  const values = ` '${firstName}', '${lastName}', '${phoneNumber}', '${password}', '${email}' `;
  try {
    const data = await passengerModel.insertWithReturn(columns, values);
    const { id } = data.rows[0];
    const userInfo = { id, firstName, lastName, email };
    const token = jwt.sign(
      {
        userInfo,
      },
      'welcomeuser',
      { expiresIn: '10h' }
    );
    res.status(200).json({ messages: userInfo,token });
  } catch (err) {
    res.status(500).json({ messages: err.message });
  }
};
