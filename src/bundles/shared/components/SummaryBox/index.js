import React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { SummaryBoxStyles } from './index.style';

export const SummaryBox = ({ header, value, colors, styles = {} }) => {
  const classes = SummaryBoxStyles({ colors });
  return (
    <Grid
      container
      direction="column"
      className={clsx(classes.GridContainer, styles.GridContainer)}>
      <Grid
        item
        className={clsx(classes.ContainerItem, classes.Header, styles.Header)}>
        {header}
      </Grid>
      <Grid
        item
        className={clsx(
          classes.ContainerItem,
          classes.Caption,
          styles.Caption
        )}>
        {value}
      </Grid>
    </Grid>
  );
};
