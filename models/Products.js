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

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  countInStock: { type: Number, required: true, default: 0 },
  description: { type: String, required: true },
},{
  timestamps: true
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)
export default Product;