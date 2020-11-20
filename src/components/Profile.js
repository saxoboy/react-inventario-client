import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { USER_GET } from "../graphql/users";
import moment from "moment";

/* MUI */
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";

import AvatarModal from "./Modal/AvatarModal";
import UserInfoModal from "./Modal/UserInfoModal";

const Profile = ({ username }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openAvatar, setOpenAvatar] = useState(false);

  const handleClickOpenAvatar = () => {
    setOpenAvatar(true);
  };

  const handleCloseAvatar = () => {
    setOpenAvatar(false);
  };

  //QUERY
  const { data, loading, error } = useQuery(USER_GET, {
    variables: { username },
  });
  if (loading) return null;
  if (error) return <p>Usuario no encontrado</p>;
  const lastLogin = moment(data.getUser.createAt).format(
    "dddd, MMMM Do YYYY, h:mm:ss a"
  );
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase
              className={classes.image}
              onClick={handleClickOpenAvatar}
            >
              <img
                className={classes.img}
                alt={data.getUser.username}
                //src={data.getUser.photo}
                src="https://source.unsplash.com/random"
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  variant="overline"
                  component="p"
                  align="right"
                  color="textSecondary"
                  paragraph
                >
                  Id: {data.getUser.id}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h5"
                  color="primary"
                >
                  {data.getUser.name} ({data.getUser.username})
                </Typography>
                <Typography variant="caption" gutterBottom paragraph>
                  {data.getUser.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Created at: {lastLogin}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  Editar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <UserInfoModal open={open} handleClose={handleClose} />
      <AvatarModal openAvatar={openAvatar} handleCloseAvatar={handleCloseAvatar}
      />
    </div>
  );
};

export default Profile;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    backgroundColor: theme.palette.primary,
  },
}));
