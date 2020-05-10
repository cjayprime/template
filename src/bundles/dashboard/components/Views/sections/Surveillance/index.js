import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import {
  FilterList,
  DataContainerWithMetadata,
  ChartHolder
} from '../../../../../shared/components';
import { SurveillanceSectionStyles } from './index.style';
import { recentCases, Legends, SectionTwoRows } from './store';

export const Surveillance = () => {
  const classes = SurveillanceSectionStyles();
  return (
    <Grid className={classes.SurveillanceContainer}>
      <Grid
        container
        className={clsx(classes.PageItem, classes.SummaryContent)}>
        <Grid
          item
          container
          wrap="nowrap"
          xs={3}
          className={classes.SummaryTab}>
          <Grid item xs={4} container className={classes.SummaryTextContainer}>
            <Typography className={classes.SummaryText}>{'Summary'}</Typography>
          </Grid>
          <Grid item xs={8} container className={classes.TvContainer}>
            <Typography className={classes.TvContainerText}>
              {'Enter TV Mode'}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4} className={classes.GapContainer}></Grid>
        <Grid item xs={5} className={classes.FilterContainer}>
          <FilterList
            styles={{
              FilterContainer: classes.FilterWithRadius
            }}
            selectorText={'Select State'}
            options={[{ value: 'Lagos' }]}
            defaultValue="Lagos"
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        justify="space-between"
        className={clsx(classes.PageItem, classes.initialSection)}
        wrap="nowrap">
        <Grid
          item
          spacing={2}
          xs={5}
          container
          className={classes.BaseSectionHolder}>
          {recentCases.map(info => {
            return (
              <Grid item xs={6}>
                <DataContainerWithMetadata
                  {...info}
                  styles={{
                    BaseContainer: classes.BaseSectionHolder
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={7} className={classes.EpidContainer}>
          <ChartHolder
            title={'Epidemiological Curve'}
            styles={{
              BaseContainer: clsx(
                classes.BaseSectionHolder,
                classes.EpidSectionHolder
              )
            }}
            legend={{
              entries: Legends.epidCurve,
              position: 'top'
            }}
          />
        </Grid>
      </Grid>
      <Grid
        justify="space-between"
        container
        spacing={2}
        wrap={'nowrap'}
        item
        className={clsx(classes.PageItem, classes.sectionTwo)}>
        {SectionTwoRows.map(node => (
          <Grid item xs={3} className={classes.SectionTwoItem}>
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
      <Grid container className={clsx(classes.PageItem, classes.SectionThree)}>
        <ChartHolder
          title={'Trends in sample testing & test Positivity (moving Average)'}
          legend={{
            position: 'top',
            entries: [
              { name: 'Total Tested', color: '#A569BD' },
              { name: 'Test positivity', color: '#F5B7B1' }
            ]
          }}
          styles={{
            BaseContainer: classes.SectionThree
          }}
        />
      </Grid>
    </Grid>
  );
};
