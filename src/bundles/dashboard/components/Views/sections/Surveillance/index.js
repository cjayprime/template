import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';

import {
  FilterList,
  DataContainerWithMetadata
} from '../../../../../shared/components';

import WithDashboardData from 'bundles/dashboard/hoc/WithDashboardData';
import { Bar, Doughnut } from 'react-chartjs-2';

import { SurveillanceSectionStyles } from './index.style';
import { groupBy, formatDate } from '../../../utilities';

const compose = require('lodash')?.flowRight;

const Surveillance = props => {
  const {
    data: {
      todayPositiveCases,
      todayDischaredCases,
      todayDeathCases,
      allDischargedPatients,
      allPositivePatient,
      allDeceasedPatients,
      allActiveCases,
      positiveTestSamples,
      allTestSamples
    }
  } = props;

  const nationalityColor = N =>
    Array(N)
      .fill()
      .map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

  const activeLabResults = [];
  allActiveCases.nodes.forEach(node => {
    if (node.activeLabResults && node.activeLabResults.nodes) {
      if (node.activeLabResults.nodes.length > 0) {
        activeLabResults.push(
          node.activeLabResults.nodes[node.activeLabResults.nodes.length - 1]
        );
      }
    }
  });

  const activeLabResultsByDate = activeLabResults.map(a => ({
    ...a,
    resultUpdateDate: formatDate(a.resultUpdateDate)
  }));
  const activeLabResultsByFormatedDate = groupBy(
    activeLabResultsByDate,
    'resultUpdateDate'
  );

  const epidemiologicalData = {
    labels: Object.keys(activeLabResultsByFormatedDate),
    datasets: [
      {
        label: 'Active',
        backgroundColor: 'rgba(235,148,72,1)',
        borderColor: 'rgba(235,148,72,1)',
        borderWidth: 1,
        barThickness: 'flex',
        hoverBackgroundColor: 'rgba(235,148,72,0.4)',
        hoverBorderColor: 'rgba(235,148,72,1)',
        data: Object.values(activeLabResultsByFormatedDate).map(d => d.length)
      },
      {
        label: 'Deaths',
        backgroundColor: 'rgba(195,74,78,1)',
        borderColor: 'rgba(195,74,78,1)',
        borderWidth: 1,
        barThickness: 'flex',
        hoverBackgroundColor: 'rgba(195,74,78,0.4)',
        hoverBorderColor: 'rgba(195,74,78,1)',
        data: Object.values(activeLabResultsByFormatedDate).map(d => d.length)
      }
    ]
  };

  const activeCasesByGender = groupBy(allActiveCases.nodes, 'sex');
  const genderData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: Object.values(activeCasesByGender).map(d => d.length * 10),
        backgroundColor: ['rgba(226,153,155,1)', 'rgba(235,148,72,1)'],
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 1)'
      }
    ]
  };

  const positiveTestSamplesByDate = positiveTestSamples.nodes.map(a => ({
    ...a,
    requestDate: formatDate(a.requestDate)
  }));
  const positiveTestSamplesByFomartedDate = groupBy(
    positiveTestSamplesByDate,
    'requestDate'
  );

  const allTestSamplesByDate = allTestSamples.nodes.map(a => ({
    ...a,
    resultUpdateDate: formatDate(a.resultUpdateDate)
  }));
  const allTestSamplesByFormatedDate = groupBy(
    allTestSamplesByDate,
    'resultUpdateDate'
  );

  const movingAvgData = {
    labels: Object.keys(positiveTestSamplesByFomartedDate),
    datasets: [
      {
        label: 'Test Positive',
        type: 'line',
        data: Object.values(positiveTestSamplesByFomartedDate).map(
          d => d.length
        ),
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
        pointHitRadius: 10
      },
      {
        label: 'Total tested',
        type: 'bar',
        data: Object.values(allTestSamplesByFormatedDate).map(d => d.length),
        fill: 'origin',
        backgroundColor: '#71B37C',
        borderColor: '#71B37C',
        hoverBackgroundColor: '#71B37C',
        barThickness: 'flex',
        hoverBorderColor: '#71B37C'
      }
    ]
  };

  const movingAvgOptions = {
    responsive: true,
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false
          },
          ticks: {
            stepSize: 0.5 // This should be calculated based on the minimum and maximum charts
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: false
          }
        }
      ]
    }
  };

  // For adding text to the center of the donut chart
  // plugins={donutChartPlugin("100")}
  const donutChartPlugin = text => [
    {
      afterDraw: (chartInstance, easing) => {
        const textX = chartInstance.chart.canvas.width / 2.21;
        const textY = chartInstance.chart.canvas.height / 1.52;
        const ctx = chartInstance.chart.ctx;
        ctx.fillText(text, textX, textY);
        ctx.fillStyle = '#ffffff';
      }
    }
  ];

  const activeCasesByNationality = groupBy(allActiveCases.nodes, 'nationality');
  const nationalityData = {
    labels: Object.keys(activeCasesByNationality),
    datasets: [
      {
        data: Object.values(activeCasesByNationality).map(d => d.length),
        backgroundColor: nationalityColor(
          Object.keys(activeCasesByNationality).length
        ),
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 1)'
      }
    ]
  };

  const recentCases = [
    {
      title: 'Today',
      entries: {
        'Confirmed Cases': todayPositiveCases.totalCount,
        Discharged: todayDischaredCases.totalCount,
        Deaths: todayDeathCases.totalCount
      }
    },
    {
      title: 'Cummulative',
      entries: {
        'Confirmed Cases': allPositivePatient.totalCount,
        Discharged: allDischargedPatients.totalCount,
        Deaths: allDeceasedPatients.totalCount,
        Active: allActiveCases.totalCount
      }
    }
  ];

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
          <Paper elevation={3} style={{ padding: '10px 5px 20px' }}>
            <Bar
              data={epidemiologicalData}
              height={80}
              options={{
                scales: {
                  xAxes: [
                    {
                      stacked: true,
                      gridLines: {
                        display: false
                      }
                    }
                  ],
                  yAxes: [
                    {
                      stacked: true,
                      gridLines: {
                        display: false
                      },
                      ticks: {
                        stepSize: 5 // This should be calculated based on the minimum and maximum charts
                      }
                    }
                  ]
                }
              }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid
        justify="space-between"
        container
        spacing={2}
        wrap={'nowrap'}
        item
        className={clsx(classes.PageItem, classes.sectionTwo)}>
        <Grid item xs={3} className={classes.SectionTwoItem}>
          <Paper elevation={3} style={{ padding: '10px 5px 20px' }}>
            <Doughnut
              data={genderData}
              height={250}
              options={{
                cutoutPercentage: 35,
                title: {
                  display: true,
                  text: 'Gender',
                  position: 'top',
                  fontSize: 16
                }
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={3} className={classes.SectionTwoItem}>
          <Paper elevation={3} style={{ padding: '10px 5px 20px' }}>
            <Doughnut
              data={genderData}
              height={250}
              options={{
                cutoutPercentage: 35,
                title: {
                  display: true,
                  text: 'Age',
                  position: 'top',
                  fontSize: 16
                }
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={3} className={classes.SectionTwoItem}>
          <Paper elevation={3} style={{ padding: '10px 5px 20px' }}>
            <Doughnut
              data={genderData}
              height={250}
              options={{
                cutoutPercentage: 35,
                title: {
                  display: true,
                  text: 'Case/ Contact',
                  position: 'top',
                  fontSize: 16
                }
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={3} className={classes.SectionTwoItem}>
          <Paper elevation={3} style={{ padding: '10px 5px 20px' }}>
            <Doughnut
              data={nationalityData}
              height={250}
              options={{
                cutoutPercentage: 35,
                title: {
                  display: true,
                  text: 'Nationality',
                  position: 'top',
                  fontSize: 16
                }
              }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container className={clsx(classes.PageItem, classes.SectionThree)}>
        <Paper
          elevation={3}
          style={{ padding: '10px 5px 20px', width: '100%' }}>
          <Bar data={movingAvgData} options={movingAvgOptions} height={90} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default compose(WithDashboardData)(Surveillance);
