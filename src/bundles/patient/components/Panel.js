import React, { useState } from 'react';
import { Grid, Typography, ButtonBase } from '@material-ui/core';
import CustomText from './custom/TextInput';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { QueuePageStyles } from 'bundles/queue/components/Views/QueueTable/index.style';
import { pendingStore } from 'bundles/queue/components/Views/QueueTable/store';
import {
    DataTable,
    Header,
    PatientMetadatum,
    TeamMetadatum,
    FilterList
  } from 'bundles/shared/components';  

const useStyles = makeStyles(theme => ({
  textPatient: {
    color: '#6A6981',
    fontSize: 24,
    textAlign: 'center'
  },
  text: {
    color: '#6A6981',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    color: '#fff',
    backgroundColor: '#7768CB',
    borderRadius: 32,
    width: 300,
    height: 50
  }
}));

const ErrorContainer = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      spacing={6}>
      <Grid item xs={6} sm={6} lg={6}>
        <Typography className={classes.textPatient}>
          No patient found
        </Typography>
      </Grid>
      <Grid item xs={3} sm={3} lg={3}>
        <Typography className={classes.text}>
          We couldn't find a patient with this phone number. You can register
          new patient while logging a call
        </Typography>
      </Grid>
      <Grid item>
        <ButtonBase
          to="/CreatePatient"
          className={classes.button}
          component={Link}>
          <Typography>LOG A CALL</Typography>
        </ButtonBase>
      </Grid>
    </Grid>
  );
};

const Patients = () => {
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
        <DataTable headers={headers} data={pendingStore} renderCollapsible={(row) => <div>Hello world</div>} />
    )
}

const Panel = () => {
  const [search, setSearch] = useState('');

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: search.length < 5 ? '80vh' : '' }}>
      <Grid item xs={search.length > 4 ? 12: 9}>
        <Grid item xs={12}>
          <CustomText change={setSearch} disableUnderline={search.length > 4} />
          {search.length > 4 ? <Patients /> : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Panel;
