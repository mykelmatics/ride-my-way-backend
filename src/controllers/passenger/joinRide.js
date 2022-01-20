import Model from '../../models/model';

const rideOfferModel = new Model('rideoffer');
const rideHistoryModel = new Model('rideHistory');

export const joinRide = async (req, res) => {
  const { offerId } = req.params;
  console.log(offerId, 'offer');
  const passengerId = req.user.userInfo.id;
  const column = '*';
  const clause = ` WHERE id = '${offerId}'`;
  try {
    const data = await rideOfferModel.select(column, clause);
    const { id, driver_id, amount, location, destination, createdAt } =
      data.rows[0];

    const columns =
      ' "driver_id", "passenger_id", "offer_id", amount, location, destination, status';
    const values = ` '${driver_id}', '${passengerId}', '${id}', '${amount}', '${location}', '${destination}', 'Pending'`;

    const addRideHistory = await rideHistoryModel.insertWithReturn(
      columns,
      values
    );
    console.log(addRideHistory);
    return res.status(200).json({ messages: 'Ride join Successfully' });
  } catch (error) {
    console.error(error, 'error message');
    return res.status(500).json({ message: error.message });
  }
};
