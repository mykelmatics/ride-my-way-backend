import Model from '../../models/model';

export const editOfferModel = new Model('offers');

export const editRideOffer = async (req, res) => {
  const data = req.body
  const {offerId} = req.params
  const { id } = req.user.userInfo;
  const clause = `WHERE id = ${offerId} AND driver_id = ${id}`;

  try {
    const dataInfo = await editOfferModel.editFromTable(
     data , clause
    );
    res.status(200).json({ messages: 'Offer edited Successfully' });
  } catch (err) {
    res.status(500).json({ messages: err.message });
  }
};
