
import mongoose from 'mongoose';

// name: 'Fit Pants',
//       slug: 'fit-pants',
//       category: 'Pants',
//       image: '/images/pants2.jpg',
//       price: 95,
//       brand: 'Zara',
//       rating: 4.5,
//       numReviews: 10,
//       countInStock: 20,
//       description: 'A popular pants',

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User || mongoose.model('User', userSchema);
export default User;