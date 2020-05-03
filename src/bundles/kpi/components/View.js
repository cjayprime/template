import React, { Fragment } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {
  DataTable,
  TeamMetadatum,
  PatientMetadatum
} from '../../../bundles/shared/components';
import KPICard from './Card';
import { patientStore } from './store';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  tableCell: {
    color: 'white'
  }
}));

const KpiView = () => {
  const classes = useStyles();

  const renderPatientCell = row => (
    <PatientMetadatum
      name={`${row.patient.firstName} ${row.patient.lastName}`}
      sex={row.patient.sex}
      age={row.patient.age}
      riskLevel={row.patientCase.riskLevel}
      textRowDirection="row"
    />
  );

  const renderTeamCell = row => (
    <TeamMetadatum
      text={row.team.name}
      tagLabel={row.task.status}
      spacing={{ mainText: 3, label: 3 }}
      classes={classes}
    />
  );

  const headers = [
    { name: 'PATIENT', accessor: renderPatientCell },
    { name: 'REQUEST DATE', accessor: 'task.requestDate' },
    { name: 'WAIT TIME', accessor: 'task.waitTime' },
    { name: 'TEAM', accessor: renderTeamCell }
  ];

  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            text="High risk patients awaiting pickup"
            count="1,450"
            buttonColor="rgb(101, 80, 190)"
            buttonContent={<ExpandMore />}
            buttonOnClick={() => console.log('Clicked')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            text="Lab results pending for more than a day"
            count="15"
            buttonColor="rgb(88, 184, 190)"
            buttonContent="show"
            buttonOnClick={() => console.log('Clicked')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            text="high risk patients awaiting pickup for more than a day"
            count="1"
            buttonColor="rgb(88, 184, 190)"
            buttonContent="show"
            buttonOnClick={() => console.log('Clicked')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            text="Patients awaiting sample collection for more than a day"
            count="245"
            buttonColor="rgb(88, 184, 190)"
            buttonContent="show"
            buttonOnClick={() => console.log('Clicked')}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <DataTable headers={headers} data={patientStore} />
      </Grid>
    </Fragment>
  );
};

export default KpiView;
