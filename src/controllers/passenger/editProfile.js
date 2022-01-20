import Model from '../../models/model';

export const editProfileModel = new Model('passenger');

export const editProfile = async (req, res) => {
  const data = req.body;
  const { id } = req.user.userInfo;
  console.log(req.user.userInfo);
  console.log('hello');
  const clause = `WHERE id = ${id}`;

  try {
    const dataInfo = await editProfileModel.editFromTable(data, clause);
    console.log(dataInfo);
    res.status(200).json({ messages: 'Profile edited Successfully' });
  } catch (err) {
    res.status(500).json({ messages: err.message });
  }
};
