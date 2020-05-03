import React, { Fragment, useState, useEffect } from 'react';
import clsx from 'clsx';
import { Container, Typography, Grid, TextField } from '@material-ui/core';
import {
  DataTable,
  Header,
  PatientMetadatum,
  TeamMetadatum,
  FilterList
} from 'bundles/shared/components'; 
import { pendingStore, patientStore } from './store';
import { QueuePageStyles } from './index.style';

export const QueueTableView = () => {
  const classes = QueuePageStyles();

  const renderPatientCell = row => (
    <PatientMetadatum
      name={`${row.patient.firstName} ${row.patient.lastName}`}
      sex={row.patient.sex}
      age={row.patient.age}
      riskLevel={row.patientCase.riskLevel}
    />
  );

  const renderTeamCell = row => {
    return (
      <TeamMetadatum
        text={row.team.name}
        tagLabel={row.task.status}
        spacing={{ mainText: 3, label: 3 }}
        classes={classes}
      />
    );
  };

  const renderActionComponent = row => (
    <Typography className={classes.ActionButton}>{'ACCEPT'}</Typography>
  );

  const headers = [
    { name: 'PATIENT', accessor: renderPatientCell },
    { name: 'REQUEST DATE', accessor: 'task.requestDate' },
    { name: 'WAIT TIME', accessor: 'task.waitTime' },
    { name: 'TEAM', accessor: renderTeamCell },
    { name: 'ACCEPTED BY', accessor: 'task.acceptedBy' },
    { name: 'ACTION', accessor: renderActionComponent }
  ];

  return (
    <Fragment>
      <Header
        pageTitle="Queue"
        contexts={{
          tabs: {
            tabItems: ['RRT', 'My Tasks'],
            defaultTab: 'RRT',
            handleTabChange: _selectedTab => {}
          },
          dateSelect: {
            defaultValue: 'TODAY',
            options: ['TODAY', 'YESTERDAY'],
            handleInputChange: _newInput => {}
          },
          search: {
            handleInputChange: _newValue => {},
            placeholder: 'Search by Patient, EPID'
          }
        }}
      />
      <Container className={classes.PageContainer}>
        <Container className={classes.TableContainer}>
          <Grid container>
            <Grid item xs={7}>
              <Typography className={classes.TextContainer}>
                {'2 Pending'}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <FilterList
                selector="LGA"
                options={[{ value: 'Lagos Mainland' }]}
              />
            </Grid>
          </Grid>
          <DataTable headers={headers} data={pendingStore} />
        </Container>

        <Container className={classes.TableContainer}>
          <Typography className={classes.TextContainer}>
            {'6 Patients'}
          </Typography>
          <DataTable headers={headers} data={patientStore} />
        </Container>
      </Container>
    </Fragment>
  );
};
