import Model from "../../models/model";

export const deleteOfferModel = new Model('rideoffer');

export const deleteRideOffer = async (req, res) => {
    const { id } = req.user.userInfo;
    const {
      offerId
    } = req.params;
    const clause = `WHERE id = ${offerId} AND driver_id = ${id}`;
    try {
      const data = await deleteOfferModel.deleteFromTable(clause);
      res.status(200).json({ messages: "Offer deleted Successfully"});
    } catch (err) {
      res.status(500).json({ messages: err.message });
    }
  };

    

  