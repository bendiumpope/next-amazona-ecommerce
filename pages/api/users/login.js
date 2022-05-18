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
  
  const user = await User.findOne({ email: req.body.email });

  console.log(user);

   await db.disconnect;

  if (user && bcrypt.compareSync(req.body.password, user.password)) {

    const token = signToken(user);
    
    return res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  }else{
   return res.status(401).send({message: 'Invalid user or password'});
  }
});

export default handler;
