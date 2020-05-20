import React from 'react';
import clsx from 'clsx';
import { Grid, Paper } from '@material-ui/core';
import { Line, Bar } from 'react-chartjs-2';
import parseToDate from 'date-fns/parse';

import {
  DataContainerWithMetadata,
  DataContainer,
  DataTable
} from '../../../../../shared/components/';
import { OverviewPageStyles } from './index.style';
import LagosMap from '../../../utilities/LagosMap';
import { groupBy, formatDate } from '../../../utilities';

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
      fatalitiesByDate,
      admissionByDate,
      recoveredByDate
    }
  } = props;

  const patientGroupByLGA = groupBy(positivePatientByLGA?.nodes, 'lga');
  const LGATableData = Object.keys(patientGroupByLGA || []).map((LGA, i) => ({
    'S/M': i + 1,
    count: patientGroupByLGA[LGA].length,
    LGA
  }));

  const positiveCasesByFormatedDate = positiveCasesByDate.nodes.map(node => ({
    ...node,
    resultUpdateDate: formatDate(node.resultUpdateDate)
  }));
  const positiveCasesGroupByDate = groupBy(
    positiveCasesByFormatedDate,
    'resultUpdateDate'
  );

  // TODO: Have a function for this.
  const fatalitiesByFormatedDate = fatalitiesByDate.nodes.map(node => ({
    ...node,
    dateOfDeath: formatDate(node.dateOfDeath)
  }));
  const fatalitiesGroupByDate = groupBy(
    fatalitiesByFormatedDate,
    'dateOfDeath'
  );

  const recoveredByFormatedDate = recoveredByDate.nodes.map(node => ({
    ...node,
    dateDischarged: formatDate(node.dateDischarged)
  }));
  const recoveredGroupByDate = groupBy(
    recoveredByFormatedDate,
    'dateDischarged'
  );

  const admissionByFormatedDate = admissionByDate.nodes.map(node => ({
    ...node,
    dateAdmitted: formatDate(node.dateAdmitted)
  }));
  const admissionGroupByDate = groupBy(admissionByFormatedDate, 'dateAdmitted');

  const classes = OverviewPageStyles();
  const headers = [
    { name: 'S/M', accessor: 'S/M' },
    { name: 'LCDA', accessor: 'LGA' },
    { name: 'Number', accessor: 'count' }
  ];

  const dataStoreInfo = [
    {
      title: 'Call Centre Details',
      entries: {
        'Total calls': totalCalls.totalCount,
        'Valid calls': totalCalls.totalCount,
        'Red Flagged': 20
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

  const epidemiologyDataLabel = [
    ...Object.keys(positiveCasesGroupByDate),
    ...Object.keys(fatalitiesGroupByDate),
    ...Object.keys(recoveredGroupByDate)
  ]
    .unique()
    .slice()
    .sort(
      (a, b) =>
        parseToDate(a, 'dd/MM/yyyy', new Date()) -
        parseToDate(b, 'dd/MM/yyyy', new Date())
    );

  const epidemiologyData = {
    labels: epidemiologyDataLabel,
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
        data: Object.values(recoveredGroupByDate).map(d => d.length)
      }
    ]
  };

  const admissionBarOption = {
    barRoundness: 1,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            stepSize: 1 // This should be calculated based on the minimum and maximum charts
          }
        }
      ]
    }
  };

  const admissionChartdata = {
    labels: Object.keys(admissionGroupByDate),
    datasets: [
      {
        label: 'Admission',
        backgroundColor: 'rgba(235,148,72,1)',
        borderColor: 'rgba(235,148,72,1)',
        borderWidth: 1,
        barThickness: 'flex',
        hoverBackgroundColor: 'rgba(235,148,72,0.4)',
        hoverBorderColor: 'rgba(235,148,72,1)',
        data: Object.values(admissionGroupByDate).map(d => d.length)
      }
    ]
  };

  const lgaData = [
    { LGA_UID: '24_01', lganame: 'Agege', value: 66 },
    { LGA_UID: '24_02', lganame: 'Ajeromi/Ifelodun', value: 109 },
    { LGA_UID: '24_03', lganame: 'Alimosho', value: 359 },
    { LGA_UID: '24_04', lganame: 'Amuwo Odofin', value: 103 },
    { LGA_UID: '24_05', lganame: 'Apapa', value: 61 },
    { LGA_UID: '24_06', lganame: 'Badagry', value: 84 },
    { LGA_UID: '24_07', lganame: 'Epe', value: 28 },
    { LGA_UID: '24_08', lganame: 'Eti Osa', value: 160 },
    { LGA_UID: '24_09', lganame: 'Ibeju Lekki', value: 61 },
    { LGA_UID: '24_10', lganame: 'Ifako/Ijaye', value: 97 },
    { LGA_UID: '24_11', lganame: 'Ikeja', value: 124 },
    { LGA_UID: '24_12', lganame: 'Ikorodu', value: 201 },
    { LGA_UID: '24_13', lganame: 'Kosofe', value: 140 },
    { LGA_UID: '24_14', lganame: 'Lagos Island', value: 58 },
    { LGA_UID: '24_15', lganame: 'Lagos Mainland', value: 61 },
    { LGA_UID: '24_16', lganame: 'Mushin', value: 98 },
    { LGA_UID: '24_17', lganame: 'Ojo', value: 119 },
    { LGA_UID: '24_18', lganame: 'Oshodi/Isolo', value: 170 },
    { LGA_UID: '24_19', lganame: 'Shomolu', value: 75 },
    { LGA_UID: '24_20', lganame: 'Surulere', value: 159 }
  ];

  return (
    <>
      <Grid
        container
        direction="row"
        wrap="wrap"
        spacing={2}
        className={clsx(
          classes.PageItem,
          classes.OverviewFlexContainer,
          classes.dataCardRow
        )}>
        {dataStoreInfo.map(info => (
          <Grid item sm={12} md={4} lg={2}>
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
            <Paper elevation={3} style={{ padding: '10px 5px 20px' }}>
              <Line data={epidemiologyData} options={admissionBarOption} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        className={clsx(classes.PageItem, classes.ConfirmedCasesSection)}>
        <Paper elevation={3} style={{ padding: '10px 5px 20px' }}>
          <LagosMap
            data={lgaData}
            title="Distribution of Confirmed Cases"
            OnLGAClick={a => {
              console.log(a);
            }}
          />
        </Paper>
      </Grid>
      <Grid
        item
        className={clsx(classes.PageItem, classes.DailyAdmissionsSection)}>
        <Paper elevation={3} style={{ padding: '10px 5px 20px' }}>
          <Bar
            data={admissionChartdata}
            height={100}
            options={admissionBarOption}
          />
        </Paper>
      </Grid>
    </>
  );
};

export default compose(WithDashboardData)(Overview);
