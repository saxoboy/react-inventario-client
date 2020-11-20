import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Profile from "../components/Profile";

const User = () => {
  const classes = useStyles();
  const { username } = useParams();
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Profile username={username} />
    </Container>
  );
};

export default User;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2, 0)
  },
}));