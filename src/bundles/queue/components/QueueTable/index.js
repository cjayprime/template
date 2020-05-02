import React, { Fragment } from 'react';
import { Container, Typography } from '@material-ui/core';
import { DataTable } from './Table';
import { useStyles } from './index.style';

const store = [
  {
    patient: {
      firstName: 'Test',
      lastName: 'User',
      sex: 'Male',
      age: '42'
    },
    patientCase: {
      riskLevel: 'High'
    },
    team: {
      name: 'RRT'
    },
    task: {
      status: 'Awaiting pickup',
      acceptedBy: 'Jolade Adewale',
      waitTime: '4 hours',
      requestDate: '31 Mar, 7:34PM'
    }
  }
];

export const QueueTableView = () => {
  const renderPatientCell = row => {
    return <Typography>{row.patient.firstName}</Typography>;
  };

  const renderTeamCell = row => {
    return <Typography>{row.team.name}</Typography>;
  };

  const renderActionComponent = row => {
    return <Typography>{'ACCEPT'}</Typography>;
  };

  const headers = [
    { name: 'PATIENT', accessor: renderPatientCell },
    { name: 'REQUEST DATE', accessor: 'requestDate' },
    { name: 'WAIT TIME', accessor: 'task.waitTime' },
    { name: 'TEAM', accessor: renderTeamCell },
    { name: 'ACCEPTED BY', accessor: 'task.acceptedBy' },
    { name: 'ACTION', accessor: renderActionComponent }
  ];
  const classes = useStyles();
  const buildPendingSection = () => {
    return <DataTable headers={headers} data={store} />;
  };
  return (
    <Fragment>
      <Container className={classes.PageContainer}>
        <Fragment>
          <Typography>{'2 pending'}</Typography>
          {buildPendingSection()}
        </Fragment>
      </Container>
    </Fragment>
  );
};
