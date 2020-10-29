import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core"

const NavBar = () => {
  return (
    <AppBar position="relative" color="primary">
      <Toolbar>
        <Typography variant="h6">algo</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
