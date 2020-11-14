import React from "react";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Search from "./Search";
import OptionsBar from "./OptionsBar";

const TopBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
            React Inventario
          </Typography>
          <div className={classes.grow} />
          <Search />
          <OptionsBar />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));
