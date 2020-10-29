import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Register from "../../components/Auth/Register";
import Login from "../../components/Auth/Login";

const Auth = () => {
  const classes = useStyles();
  const [showLogin, setShowLogin] = useState(true);
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {showLogin ? "Login" : "Register"}
          </Typography>
          {showLogin ? (
            <>
              <Login />
              <Grid container className={classes.options}>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    variant="body2"
                    className={classes.links}
                    onClick={() => {
                      setShowLogin(!showLogin);
                    }}
                  >
                    {"Do you have an account? Log in"}
                  </Link>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Register setShowLogin={setShowLogin} />
              <Box mt={3}>
                <Link
                  variant="body1"
                  className={classes.links}
                  onClick={() => {
                    setShowLogin(!showLogin);
                  }}
                >
                  {"Do you have an account? Log in"}
                </Link>
              </Box>
            </>
          )}
          <Box mt={5}>
            <Typography component="p" variant="body2" paragraph>
              Copyright 2020 @saxoboy
            </Typography>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default Auth;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  options: {
    width: "22rem",
    marginTop: theme.spacing(3),
  },
  links: {
    cursor: "pointer",
  },
}));
