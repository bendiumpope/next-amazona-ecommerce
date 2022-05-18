import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import NextLink from 'next/link';
import React, { useState } from 'react';

import Layout from '../components/Layout';
import useStyles from '../utils/styles';

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   
  console.log(email, password);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {

      let userData = {
        email,
        password,
      };
      
      // const { data } = axios.post('/api/users/login', userData);
      const {data} = await axios.post('api/users/login', userData)

      alert('success login');
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.message);
    }
  };

  return (
    <Layout title="Login">
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          Don't have an account? &nbsp;
          <NextLink href="/register" passHref>
            <Link>Register</Link>
          </NextLink>
        </List>
      </form>
    </Layout>
  );
}
