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
import Cookies from 'js-cookie';
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';

export default function Register() {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  console.log(email, password);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if(password !== confirmPassword){
      alert("Passwords don't match")
      return;
    }

    try {
      let userData = {
        name,
        email,
        password,
      };

      // const { data } = axios.post('/api/users/login', userData);
      const { data } = await axios.post('api/users/register', userData);

      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.message);
    }
  };

  return (
    <Layout title="Register">
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Register
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              label="Name"
              inputProps={{ type: 'text' }}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </ListItem>
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
            <TextField
              variant="outlined"
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              inputProps={{ type: 'password' }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Register
            </Button>
          </ListItem>
          Already have an account? &nbsp;
          <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
            <Link>Login</Link>
          </NextLink>
        </List>
      </form>
    </Layout>
  );
}
