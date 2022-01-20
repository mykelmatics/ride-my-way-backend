import Model from '../../models/model';
import jwt from 'jsonwebtoken'

export const driverModel = new Model('driver');

export const createDriverAccount = async (req, res) => {
  const { firstName, lastName, phoneNumber, password, email } = req.body;
  const columns = '"firstName", "lastName", "phoneNumber", password, email';
  const values = ` '${firstName}', '${lastName}', '${phoneNumber}', '${password}', '${email}' `;

  try {
    const data = await driverModel.insertWithReturn(columns, values);
    const { id } = data.rows[0];
    const userInfo = { id, firstName, lastName, email };
    const token = jwt.sign(
      {
        userInfo,
      },
      'welcomeuser',
      { expiresIn: '10h' }
    );
    res.status(200).json({ messages: data.rows, token });
  } catch (err) {
    res.status(500).json({ messages: err.message });
  }
};
