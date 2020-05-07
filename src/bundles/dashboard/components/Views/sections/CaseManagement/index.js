import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { ChartHolder } from '../../../../../shared/components';
import { CaseManagementStyles } from './index.style';
import { SectionTwoRows, SectionThreeRows } from './store';

export const CaseManagement = () => {
  const classes = CaseManagementStyles();
  return (
    <Container className={classes.CaseContainer}>
      <Grid
        container
        direction="column"
        className={clsx(classes.PageItem, classes.SectionOne)}>
        <Grid
          item
          className={clsx(
            classes.SectionOneItem,
            classes.SectionOneTextContainer
          )}>
          <Typography className={classes.SectionOneText}>
            {'Bed occupancy'}
          </Typography>
        </Grid>
        <Grid item className={clsx(classes.SectionOneChartContainer)}>
          <ChartHolder
            title={'Current occupancy by ward'}
            styles={{
              BaseContainer: classes.SectionOneChart,
              FooterLegendContainer: classes.ChartFooterLegend
            }}
            legend={{
              position: 'bottom',
              spacing: 6,
              entries: [
                { name: 'Occupied', color: '#EEBEC2' },
                { name: 'Available', color: '#C1F7F9' }
              ]
            }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        wrap="nowrap"
        className={clsx(classes.PageItem, classes.SectionTwo)}>
        {SectionTwoRows.map(node => (
          <Grid item xs={4} className={classes.SectionTwoItem}>
            <ChartHolder
              title={node.title}
              legend={node.legend}
              footerText={node.footerText}
              styles={{
                BaseContainer: classes.SectionTwoNode
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        className={clsx(classes.PageItem, classes.SectionThree)}
        direction="column">
        <Grid
          item
          className={clsx(
            classes.SectionOneItem,
            classes.SectionOneTextContainer
          )}>
          <Typography className={classes.SectionOneText}>
            {'Duration of admission'}
          </Typography>
        </Grid>
        <Grid item container wrap="nowrap" className={classes.SectionThree}>
          {SectionThreeRows.map((node, i) => (
            <Grid
              item
              xs={i === 2 ? 7 : 3}
              className={classes.SectionThreeItem}>
              <ChartHolder
                title={node.title}
                legend={node.legend}
                footerText={node.footerText}
                styles={{
                  BaseContainer: classes.SectionTwoNode
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid
        container
        wrap="nowrap"
        className={clsx(classes.PageItem, classes.SectionFour)}>
        <Grid item xs={9} className={classes.ChartContainer}>
          <ChartHolder
            title={'Symptoms on Admission'}
            styles={{
              BaseContainer: classes.SectionFourChart
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <ChartHolder
            title={'Presenting symptoms'}
            styles={{
              BaseContainer: classes.SectionFourChart
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
