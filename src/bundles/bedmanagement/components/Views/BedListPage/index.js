import React, { Fragment } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { BedListPageStyles } from './index.style';
import { summaryNumbers, store } from './store';
import {
  Header,
  DataTable,
  PatientMetadatum,
  SummaryBox
} from '../../../../shared/components';

export const BedListPage = props => {
  const classes = BedListPageStyles();

  const renderPatientCell = row => (
    <PatientMetadatum
      name={`${row.patient.firstName} ${row.patient.lastName}`}
      sex={row.patient.sex}
      age={row.patient.age}
      textRowDirection={'row'}
      riskLevel={row.patient.case.riskLevel}
    />
  );

  const renderActionComponent = row => (
    <Typography className={classes.ActionButton}>{'VIEW CASE'}</Typography>
  );

  const tableHeaders = [
    { name: 'PATIENT', accessor: renderPatientCell },
    { name: 'EPID NO', accessor: 'patient.epidNumber' },
    { name: 'ADMITTED', accessor: 'patient.case.admittedAt' },
    { name: 'ACTION', accessor: renderActionComponent }
  ];
  return (
    <Fragment>
      <Header
        pageTitle={'Bed Management'}
        styles={{ RootTabsContainer: classes.HeaderTabsContainer }}
        contexts={{
          tabs: {
            tabItems: ['Yaba Center', 'Onikan Center'],
            defaultTab: 'Yaba Center',
            handleTabChange: _selectedTab => {}
          }
        }}
      />
      <Container>
        <Grid className={classes.SummaryContainer} container>
          {summaryNumbers.map(item => {
            return (
              <Grid xs={4} item key={item.header.label}>
                <SummaryBox
                  header={item.header.label}
                  value={item.value.label}
                  colors={{
                    header: item.header.color,
                    caption: item.value.color
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid container direction="column" className={classes.TableContainer}>
          <DataTable headers={tableHeaders} data={store} />
        </Grid>
      </Container>
    </Fragment>
  );
};
