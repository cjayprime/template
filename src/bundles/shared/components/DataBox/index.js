import React from 'react';
import clsx from 'clsx';
import { Container, Grid, Typography } from '@material-ui/core';
import {
  DataContainerStyles,
  DataContainerWithMetadataStyles
} from './index.style';

export const DataContainer = ({ children, styles }) => {
  const classes = DataContainerStyles();
  return (
    <Container className={clsx(classes.BaseContainer, styles.BaseContainer)}>
      {children}
    </Container>
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
    <DataContainer styles={styles}>
      <Grid
        container
        direction="column"
        className={clsx(classes.OverviewInfoContainer, styles.root)}>
        <Grid
          item
          xs={3}
          className={clsx(
            classes.SummaryHeaderContainer,
            styles.SummaryHeaderContainer
          )}>
          <Typography className={classes.SummaryBoxTitle}>{title}</Typography>
          <Typography className={classes.SummaryBoxCaption}>
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
                {...(itemSpacing ? { xs: itemSpacing } : {})}
                className={classes.EntryContainer}
                style={{
                  ...(k.includes('Red Flagged', 'Deaths')
                    ? { color: '#E74C3C', fontWeight: 'bold' }
                    : {})
                }}>
                <Grid item xs={8} className={classes.EntryKey}>
                  {k}
                </Grid>
                <Grid item xs={4} className={classes.EntryValue}>
                  {v}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </DataContainer>
  );
};
