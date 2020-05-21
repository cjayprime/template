import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import {
  SectionOneData,
  SectionTwoData,
  SectionThreeData,
  SectionThreeChartData
} from './store';
import {
  SummaryBox,
  ChartHolder,
  FilterList
} from '../../../../../shared/components';
import { LaboratoryStyles } from './index.style';

export const Laboratory = () => {
  const classes = LaboratoryStyles();
  return (
    <div className={classes.PageContainer}>
      <Grid container className={clsx(classes.PageItem, classes.SectionOne)}>
        {SectionOneData.map(node => {
          return (
            <Grid item xs={4}>
              <SummaryBox {...node} />
            </Grid>
          );
        })}
      </Grid>
      <Grid
        container
        wrap="nowrap"
        className={clsx(classes.PageItem, classes.SectionTwo)}>
        {SectionTwoData.map(node => {
          return (
            <Grid item xs={6} className={classes.SectionTwoNode}>
              <ChartHolder
                {...node}
                styles={{
                  BaseContainer: classes.SectionTwoItem
                }}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid container direction="column" className={clsx(classes.PageItem)}>
        <Grid container className={classes.SectionThreeItem}>
          <Grid item xs={8}>
            <Typography className={classes.HeaderText}>
              {'Sample turn around time (TAT-Collection to Testing)'}
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.FilterContainer}>
            <FilterList
              selectorText={'Sample Type'}
              options={[{ value: 'All samples' }]}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap="nowrap"
          className={clsx(classes.SectionThreeItem, classes.MetaInfoContainer)}>
          {SectionThreeData.map(node => {
            return (
              <Grid item xs={6}>
                <SummaryBox
                  {...node}
                  styles={{
                    Header: classes.SummaryHeader,
                    Caption: classes.SummaryCaption,
                    GridContainer: classes.GridContainer
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid
          container
          wrap="nowrap"
          className={clsx(
            classes.SectionThreeItem,
            classes.ChartInfoContainer
          )}>
          {SectionThreeChartData.map(node => {
            return (
              <Grid item xs={6} className={classes.SectionTwoNode}>
                <ChartHolder
                  {...node}
                  styles={{
                    BaseContainer: classes.SectionTwoItem
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        className={clsx(classes.PageItem, classes.SectionFour)}>
        <ChartHolder
          styles={{
            BaseContainer: classes.SectionFourChart
          }}
          {...{ title: 'Sample testing & test positivity (absolute)' }}
        />
      </Grid>
    </div>
  );
};
