import React from 'react';
import clsx from 'clsx';
import { Grid, Typography } from '@material-ui/core';
import {
  DataContainerStyles,
  DataContainerWithMetadataStyles
} from './index.style';

export const DataContainer = ({ children, styles, className, ...props }) => {
  const classes = DataContainerStyles();
  return (
    <Grid
      className={clsx(classes.BaseContainer, styles.BaseContainer, className)}
      {...props}>
      {children}
    </Grid>
  );
};

export const DataContainerWithMetadata = props => {
  const {
    entries,
    caption,
    title,
    entryDirection = 'column',
    itemSpacing,
    styles = {}
  } = props;
  const classes = DataContainerWithMetadataStyles();
  return (
    <DataContainer
      styles={styles}
      container
      direction="column"
      className={clsx(classes.OverviewInfoContainer, styles.root)}>
      <Grid
        item
        xs
        className={clsx(
          classes.SummaryHeaderContainer,
          styles.SummaryHeaderContainer
        )}>
        <Typography
          gutterBottom
          variant="h5"
          className={classes.SummaryBoxTitle}>
          {title}
        </Typography>
        <Typography variant="caption" className={classes.SummaryBoxCaption}>
          {caption}
        </Typography>
      </Grid>
      <Grid
        container
        direction={entryDirection}
        className={clsx(classes.EntryHolder, styles.EntryHolder)}>
        {Object.entries(entries).map(([k, v]) => {
          return (
            <Grid
              container
              item
              alignContent="space-between"
              {...(itemSpacing ? { xs: itemSpacing } : {})}
              className={classes.EntryContainer}>
              <Grid item xs={8} className={classes.EntryKey}>
                <Typography
                  gutterBottom
                  style={{
                    ...(['Red Flagged', 'Deaths'].some(i => k.includes(i))
                      ? { color: '#E74C3C', fontWeight: 'bold' }
                      : {})
                  }}>
                  {k}
                </Typography>
              </Grid>
              <Grid item xs={4} className={classes.EntryValue}>
                <Typography gutterBottom align="right">
                  {v}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </DataContainer>
  );
};
