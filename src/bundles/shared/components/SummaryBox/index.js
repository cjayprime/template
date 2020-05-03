import React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { SummaryBoxStyles } from './index.style';

export const SummaryBox = ({ header, value, colors }) => {
  const classes = SummaryBoxStyles({ colors });
  return (
    <Grid container direction="column" className={classes.GridContainer}>
      <Grid item className={clsx(classes.ContainerItem, classes.Header)}>
        {header}
      </Grid>
      <Grid item className={clsx(classes.ContainerItem, classes.Caption)}>
        {value}
      </Grid>
    </Grid>
  );
};
