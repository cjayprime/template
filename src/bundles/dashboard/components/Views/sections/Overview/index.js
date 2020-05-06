import React from 'react';
import { Grid, Typography, Container } from '@material-ui/core';
import { OverviewPageStyles } from './index.style';
import { basicInfoStore } from './store';

export const Overview = () => {
  const classes = OverviewPageStyles();
  const OverviewBox = ({ children }) => (
    <Container className={classes.BaseContainer}>{children}</Container>
  );

  const buildOverviewInfo = props => {
    const { entries, caption, title } = props;
    return (
      <Grid
        container
        direction="column"
        className={classes.OverviewInfoContainer}>
        <Grid item xs={3} className={classes.SummaryHeaderContainer}>
          <Typography className={classes.SummaryBoxTitle}>{title}</Typography>
          <Typography className={classes.SummaryBoxCaption}>
            {caption}
          </Typography>
        </Grid>
        <Grid container direction="column" className={classes.EntryHolder}>
          {Object.entries(entries).map(([k, v]) => {
            return (
              <Grid
                container
                item
                // xs={12 / Object.keys(entries).length}
                className={classes.EntryContainer}
                style={{ ...(k.includes('Red') ? { color: 'red' } : {}) }}>
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
    );
  };

  return (
    <Grid direction="column" container>
      {/* Section details */}
      <Grid
        item
        container
        direction="row"
        className={classes.OverviewFlexContainer}>
        {basicInfoStore.map(info => (
          <Grid container item xs={2.1}>
            <OverviewBox>{buildOverviewInfo({ ...info })}</OverviewBox>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
