import React from 'react';
import clsx from 'clsx';
import { Grid, Typography, Container } from '@material-ui/core';
import { OverviewPageStyles } from './index.style';
import { basicInfoStore, SectionTwoStore } from './store';

export const Overview = () => {
  const classes = OverviewPageStyles();
  const OverviewBox = ({ children }) => (
    <Container className={classes.BaseContainer}>{children}</Container>
  );

  const buildOverviewInfo = props => {
    const {
      entries,
      caption,
      title,
      entryDirection = 'column',
      itemSpacing,
      userStyles = {}
    } = props;
    return (
      <Grid
        container
        direction="column"
        className={clsx(classes.OverviewInfoContainer, userStyles.root)}>
        <Grid
          item
          xs={3}
          className={clsx(
            classes.SummaryHeaderContainer,
            userStyles.SummaryHeaderContainer
          )}>
          <Typography className={classes.SummaryBoxTitle}>{title}</Typography>
          <Typography className={classes.SummaryBoxCaption}>
            {caption}
          </Typography>
        </Grid>
        <Grid
          container
          direction={entryDirection}
          className={clsx(classes.EntryHolder, userStyles.EntryHolder)}>
          {Object.entries(entries).map(([k, v]) => {
            return (
              <Grid
                container
                item
                {...(itemSpacing ? { xs: itemSpacing } : {})}
                className={classes.EntryContainer}
                style={{
                  ...(k.includes('Red Flagged')
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
    );
  };

  return (
    <Grid direction="column" container>
      {/* Section 1 */}
      <Grid
        item
        container
        direction="row"
        className={clsx(classes.PageItem, classes.OverviewFlexContainer)}>
        {basicInfoStore.map(info => (
          <Grid container item xs={2.1}>
            <OverviewBox>{buildOverviewInfo({ ...info })}</OverviewBox>
          </Grid>
        ))}
      </Grid>
      {/* Section 2 */}
      <Grid
        item
        container
        className={clsx(classes.PageItem, classes.SectionTwo)}>
        <Grid item xs={5}></Grid>
        <Grid item direction="column" xs={7}>
          <Grid item container>
            <Grid item xs={8}>
              <OverviewBox>
                {buildOverviewInfo({
                  ...SectionTwoStore.Admissions,
                  entryDirection: 'row',
                  itemSpacing: 6,
                  userStyles: {
                    SummaryHeaderContainer: classes.LargeSummaryHolder,
                    EntryHolder: classes.LargeEntryHolder
                  }
                })}
              </OverviewBox>
            </Grid>
            <Grid item xs={4}>
              <OverviewBox>
                {buildOverviewInfo({ ...SectionTwoStore.DischargedPatients })}
              </OverviewBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
