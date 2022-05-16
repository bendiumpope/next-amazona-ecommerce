import { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  Container,
  Link,
  Toolbar,
  Typography,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge
} from '@material-ui/core';
// import {Badge} from '@mui/material';
import { createTheme } from '@material-ui/core/styles';
import Head from 'next/head';
import React from 'react';
import NextLink from 'next/link';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie'

export default function Layout({ title, description, children }) {
  const {state, dispatch} = useContext(Store);
  const {darkMode, cart} = state;
  let [badge, setBadge] = useState('')

  const darkModeChangeHandler = ()=>{
    dispatch({type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON'})
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  }

   const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secodary: {
        main: '#208080',
      },
    },
  });
  const classes = useStyles();
  // console.log(cart.cartItems)

  useEffect(()=>{

    
    if(cart.cartItems.length > 0) {
      setBadge(
        <Badge
          color="secondary"
          badgeContent={cart.cartItems.length}
          overlap="rectangular"
        >
          Cart
        </Badge>
      );
    }
                    
  }, [cart.cartItems])

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : 'Next Amazona'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>amazona</Typography>
              </Link>
            </NextLink>

            <div className={classes.grow}></div>
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/cart" passHref>
                <Link>
                  {badge ? badge : ('Cart')}
                </Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved. Next Amazona</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
