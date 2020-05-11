import React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import {
  ChartHolder,
  DataContainerWithMetadata,
  DataContainer,
  DataTable
} from '../../../../../shared/components/';
import { OverviewPageStyles } from './index.style';
import { SectionTwoStore, Legends, TableData } from './store';

import WithDashboardData from 'bundles/dashboard/hoc/WithDashboardData';
const compose = require('lodash')?.flowRight;

const Overview = props => {
  const {
    data: {
      totalLab,
      newlabRequest,
      positiveCasesNew,
      positiveCases,
      newAwaitingResult,
      awaitingResult,
      evacAwaitingPickUp,
      totalFatalities,
      dischargedPatients,
      newDischargedPatients
    }
  } = props;

  const classes = OverviewPageStyles();
  const headers = [
    { name: 'S/M', accessor: 'S/M' },
    { name: 'LGA', accessor: 'LGA' },
    { name: 'Number', accessor: 'count' }
  ];

  const dataStoreInfo = [
    {
      title: 'Call Centre Details',
      entries: {
        'Total calls': 1500,
        'Valid calls': 1500,
        'Red Flagged': 200
      }
    },
    {
      title: 'Number of tests',
      entries: {
        New: newlabRequest.totalCount,
        Awaiting: awaitingResult.totalCount,
        TOTAL: totalLab.totalCount
      }
    },
    {
      title: 'Positive Cases',
      entries: {
        New: positiveCasesNew.totalCount,
        TOTAL: positiveCases.totalCount
      }
    },
    {
      title: 'Positive Cases',
      caption: 'WAITING EVACUATION',
      entries: {
        'Avg Days': 15,
        TOTAL: evacAwaitingPickUp.totalCount
      }
    },
    {
      title: 'Fatalities',
      entries: {
        New: 10,
        Total: totalFatalities.totalCount
      }
    },
    {
      title: 'Fatalities',
      entries: {
        New: 10,
        Total: totalFatalities.totalCount
      }
    }
  ];

  const SectionTwoStore = {
    DischargedPatients: {
      title: 'Discharged Patients',
      entries: {
        New: newDischargedPatients.totalCount,
        TOTAL: dischargedPatients.totalCount
      }
    },
    Admissions: {
      title: 'Admissions',
      entries: {
        'New Isolation': 3,
        'New ICU': 2,
        'Valid Calls': 10,
        'Current ICU': 5,
        'Red Flagged': 13,
        'Avg Days': 12
      }
    }
  };

  return (
    <>
      <Grid
        container
        direction="row"
        wrap="nowrap"
        spacing={2}
        className={clsx(
          classes.PageItem,
          classes.OverviewFlexContainer,
          classes.dataCardRow
        )}>
        {dataStoreInfo.map(info => (
          <Grid item xs={12} md={2}>
            <DataContainerWithMetadata {...info} />
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        container
        justify="space-between"
        spacing={2}
        className={clsx(classes.PageItem, classes.SectionTwo)}>
        <Grid item xs={12} md={4}>
          <DataContainer styles={{ BaseContainer: classes.TableContainer }}>
            <DataTable
              headers={headers}
              data={TableData}
              styles={{
                Table: classes.Table,
                TableCell: classes.TableCell
              }}
            />
          </DataContainer>
        </Grid>
        <Grid item direction="column" md={8} xs={12}>
          <Grid item container spacing={2} justify="space-between">
            <Grid item xs={12} md={9}>
              <DataContainerWithMetadata
                {...{
                  ...SectionTwoStore.Admissions,
                  entryDirection: 'row',
                  itemSpacing: 6,
                  styles: {
                    SummaryHeaderContainer: classes.LargeSummaryHolder,
                    EntryHolder: classes.LargeEntryHolder
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DataContainerWithMetadata
                {...{ ...SectionTwoStore.DischargedPatients }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.EpidInfoContainer}>
            <ChartHolder
              title="Epidemiology curve"
              styles={{
                BaseContainer: classes.EpidInfoLegend
              }}
              legend={{
                entries: Legends.epidCurve,
                position: 'top'
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        className={clsx(classes.PageItem, classes.ConfirmedCasesSection)}>
        <ChartHolder
          title="Distribution of confirmed cases"
          styles={{
            BaseContainer: classes.BaseSection
          }}
        />
      </Grid>
      <Grid
        item
        className={clsx(classes.PageItem, classes.DailyAdmissionsSection)}>
        <ChartHolder
          title="Daily Admissions"
          legend={{
            entries: [{ name: 'Admissions', color: '#8EE2E5' }],
            position: 'top'
          }}
          styles={{
            BaseContainer: classes.BaseSection,
            HeaderLegendContainer: classes.AdmissionLegend
          }}
        />
      </Grid>
    </>
  );
};

export default compose(WithDashboardData)(Overview);
