import Model from '../../models/model';

export const rideOfferModel = new Model('offers');

export const addRide = async (req, res) => {
  console.log('hello');
  const { id } = req.user.userInfo;
  const { location, destination, amount, status } = req.body;
  const columns = ' "driver_id", "location", "destination", "amount", "status"';
  const values = ` '${id}', '${location}', '${destination}', '${amount}', '${status}' `;
  try {
    const data = await rideOfferModel.insertWithReturn(columns, values);
    console.log(data);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(500).json({ messages: err.message });
  }
};


export const createdOffer = async (req, res) => {
  const columns = '*';
  const {id} = req.user.userInfo
  const clause = ` WHERE driver_id = '${id}'`;
  try {
    const data = await rideOfferModel.select(columns, clause);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(500).json({ messages: err.message });
  }
};