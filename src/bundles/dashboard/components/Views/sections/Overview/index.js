import React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { Line } from 'react-chartjs-2';

import {
  ChartHolder,
  DataContainerWithMetadata,
  DataContainer,
  DataTable
} from '../../../../../shared/components/';
import { OverviewPageStyles } from './index.style';

import WithDashboardData from 'bundles/dashboard/hoc/WithDashboardData';
const compose = require('lodash')?.flowRight;

const Overview = props => {
  const {
    data: {
      newCalls,
      totalCalls,
      totalLab,
      newlabRequest,
      positiveCasesNew,
      positiveCases,
      newAwaitingResult,
      awaitingResult,
      evacAwaitingPickUp,
      totalFatalities,
      newFatalities,
      dischargedPatients,
      newDischargedPatients,
      positivePatientByLGA,
      currentIsolation,
      newIsolation,
      currentICU,
      newICU,
      positiveCasesByDate,
      fatalitiesByDate
    }
  } = props;

  const groupBy = (objectArray, property) => {
    return objectArray.reduce(function(total, obj) {
      let key = obj[property];
      if (!total[key]) {
        total[key] = [];
      }
      total[key].push(obj);
      return total;
    }, {});
  };

  const patientGroupByLGA = groupBy(positivePatientByLGA.nodes, 'lga');
  const LGATableData = Object.keys(patientGroupByLGA).map((LGA, i) => ({
    'S/M': i + 1,
    count: patientGroupByLGA[LGA].length,
    LGA
  }));

  const formatDate = dateString => {
    const dateObject = new Date(Date.parse(dateString));
    const addLeadingZero = d => (d < 10 ? `0${d}` : d);
    var dd = dateObject.getDate();
    var mm = dateObject.getMonth() + 1;
    var yyyy = dateObject.getFullYear();
    return `${addLeadingZero(dd)}/${addLeadingZero(mm)}/${yyyy}`;
  };

  const positiveCasesByFormatedDate = positiveCasesByDate.nodes.map(node => ({
    ...node,
    resultUpdateDate: formatDate(node.resultUpdateDate)
  }));
  const positiveCasesGroupByDate = groupBy(
    positiveCasesByFormatedDate,
    'resultUpdateDate'
  );

  const fatalitiesByFormatedDate = fatalitiesByDate.nodes.map(node => ({
    ...node,
    dateOfDeath: formatDate(node.dateOfDeath)
  }));
  const fatalitiesGroupByDate = groupBy(
    fatalitiesByFormatedDate,
    'dateOfDeath'
  );

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
        'Total calls': totalCalls.totalCount,
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
        New: newFatalities.totalCount,
        Total: totalFatalities.totalCount
      }
    },
    {
      title: 'Fatalities',
      entries: {
        New: newFatalities.totalCount,
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
        'New Isolation': newIsolation.totalCount,
        'New ICU': newICU.totalCount,
        'Current Isolation': currentIsolation.totalCount,
        'Current ICU': currentICU.totalCount,
        'Red Flagged': 13,
        'Avg Days': 12
      }
    }
  };

  const data = {
    labels: Object.keys(positiveCasesGroupByDate),
    datasets: [
      {
        label: 'Positive tests',
        lineTension: 0.1,
        backgroundColor: 'rgba(231,187,134,0.2)',
        borderColor: 'rgba(231,187,134,1)',
        fill: 'origin',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(231,187,134,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(231,187,134,1)',
        pointHoverBorderColor: 'rgba(231,187,134,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: Object.values(positiveCasesGroupByDate).map(d => d.length)
      },
      {
        label: 'Fatalities',
        lineTension: 0.1,
        backgroundColor: 'rgba(248,78,94,0.2)',
        borderColor: 'rgba(248,78,94,1)',
        fill: 'origin',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(248,78,94,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(248,78,94,1)',
        pointHoverBorderColor: 'rgba(248,78,94,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: Object.values(fatalitiesGroupByDate).map(d => d.length)
      },
      {
        label: 'Recovered',
        lineTension: 0.1,
        backgroundColor: 'rgba(121,183,185,0.2)',
        borderColor: 'rgba(121,183,185,1)',
        fill: 'origin',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba121,183,185,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(121,183,185,1)',
        pointHoverBorderColor: 'rgba(121,183,185,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [1, 2, 1, 4]
      }
    ]
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
              data={LGATableData}
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
            {/* <ChartHolder
              title="Epidemiology curve"
              styles={{
                BaseContainer: classes.EpidInfoLegend
              }}
              legend={{
                entries: Legends.epidCurve,
                position: 'top'
              }}
            /> */}
            <Line data={data} />
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
