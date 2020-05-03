import React from 'react';
import { Grid, Typography, AppBar } from '@material-ui/core';
import Phone from '@material-ui/icons/Phone';
import CloseIcon from '@material-ui/icons/Close';

const Header = ({ classes, text }) => {
  return (
    <AppBar
      elevation={0}
      style={{ backgroundColor: 'transparent' }}
      position="sticky">
      <Grid container xs={12} className={classes.childGrid} direction="row">
        <Grid container xs={6} justify="flex-start">
          <Phone className={classes.icon} />
          <Typography className={classes.text}>{text}</Typography>
        </Grid>
        <Grid container xs={6} lg={6} md={6} justify="flex-end">
          <CloseIcon className={classes.icon} />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
