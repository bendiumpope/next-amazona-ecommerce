import bcrypt from 'bcryptjs';
import nc from 'next-connect';
// import Product from '../../../models/Products';
import User from '../../../models/User';
import signToken from '../../../utils/auth';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  // console.log(user, 'connecting');
  await db.connect();
  // console.log(user, "finished connnecting");

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  });

  const createdUser = await user.save();

  await db.disconnect;

  const token = signToken(createdUser);

  return res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export default handler;
