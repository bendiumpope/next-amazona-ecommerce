import { useContext } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import Layout from '../components/Layout';
// import data from '../utils/data';
import NextLink from 'next/link';
import db from '../utils/db';
import Product from '../models/Products';
import axios from 'axios';
import { Store } from '../utils/Store';

export default function Home(props) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const {products} = props

  const addToCartHandler = async (product)=>{
    const existItem = state.cart.cartItems.find(item => item._id === product._id); 
    const quantity = existItem ? existItem.quantity + 1 : 1;
    
    const {data} = await axios.get(`/api/products/${product._id}`);
    
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: quantity },
    });

    router.push('/cart');
  }
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => {
            return (
              <Grid item md={4} key={product.name}>
                <Card>
                  <NextLink href={`/product/${product.slug}`} passHref>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={product.image}
                        title={product.name}
                      ></CardMedia>
                      <CardContent>
                        <Typography>{product.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </NextLink>
                  <CardActions>
                    <Typography>${product.price}</Typography>
                    <Button size="small" color="primary" onClick={() => addToCartHandler(product)}>
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(){
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
