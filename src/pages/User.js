import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import Profile from "../components/Profile";

const User = () => {
  const { username } = useParams();
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" component="h1" color="initial">
        <Profile username={username} />
      </Typography>
    </Container>
  );
};

export default User;
