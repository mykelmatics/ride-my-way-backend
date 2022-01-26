import assignToken from '../../helper/assignToken';
import Model from '../../models/model';

export const driverModel = new Model('drivers');

export const createDriverAccount = async (req, res) => {
  const { firstName, lastName, phoneNumber, password, email } = req.body;
  const columns = '"firstname", "lastname", "phone_number", password, email';
  const values = ` '${firstName}', '${lastName}', '${phoneNumber}', '${password}', '${email}' `;

  try {
    const data = await driverModel.insertWithReturn(columns, values);
    const { id } = data.rows[0];
    const userInfo = { id, firstName, lastName, email };
    const token = assignToken(userInfo);
    res.status(200).json({ messages: data.rows, token });
  } catch (err) {
    res.status(500).json({ messages: err.message });
  }
};
