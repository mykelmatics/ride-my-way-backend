import Model from '../../models/model';

const rideOfferModel = new Model('offers');

export const rideOffers = async (req, res) => {
  const columns = '*';
  try {
    const data = await rideOfferModel.select(columns);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(500).json({ messages: err.message });
  }
};
