import Model from '../../models/model';

const rideOfferModel = new Model('offers');
const rideHistoryModel = new Model('rideHistory');

export const joinRide = async (req, res) => {
  const { offerId } = req.params;
  const passengerId = req.user.userInfo.id;
  const column = '*';
  const clause = ` WHERE id = '${offerId}'`;
  try {
    const data = await rideOfferModel.select(column, clause);
    const { id, driverId, amount, location, destination, createdAt } =
      data.rows[0];

    const columns =
      ' "driver_id", "passenger_id", "offer_id", amount, location, destination, status';
    const values = ` '${driverId}', '${passengerId}', '${id}', '${amount}', '${location}', '${destination}', 'Pending'`;
    const addRideHistory = await rideHistoryModel.insertWithReturn(
      columns,
      values
    );
    return res.status(200).json({ messages: 'Ride join Successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
