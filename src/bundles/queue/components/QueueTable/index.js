import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Container, Typography, Chip, Grid } from '@material-ui/core';
import { DataTable } from './Table';
import {
  pageStyles,
  TagStyles,
  teamSectionStyles,
  PatientMetadatumStyles
} from './index.style';

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
      status: 'Awaiting sample pickup',
      acceptedBy: 'Jolade Adewale',
      waitTime: '4 hours',
      requestDate: '31 Mar, 7:34PM'
    }
  },
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
      status: 'Sample Collected',
      acceptedBy: 'Jolade Adewale',
      waitTime: '4 hours',
      requestDate: '31 Mar, 7:34PM'
    }
  }
];

// TODO {H.Ezekiel} Refactor this to lib/shared/components
const TeamTag = ({ tagLabel, text, classes = {}, spacing }) => {
  const styles = TagStyles();
  return (
    <Grid container>
      <Grid item xs={spacing.mainText || 6}>
        <Typography
          className={clsx(styles.TextContainer, classes.TextContainer)}>
          {text}
        </Typography>
      </Grid>
      <Grid item xs={spacing.label || 6}>
        <Chip
          variant="default"
          size="small"
          color={'primary'}
          label={tagLabel}
          className={clsx(styles.ChipContainer, classes.ChipContainer)}
        />
      </Grid>
    </Grid>
  );
};

const PatientMetadatumView = (props) => {
  const { name, sex, age, riskLevel } = props;
  const classes = PatientMetadatumStyles(props);
  return (
    <Grid container>
      <Grid container item direction="column" xs={7}>
        <Grid item>
          <Typography className={classes.Nametext}>{name}</Typography>
        </Grid>
        <Grid item>
          <Typography
            className={
              classes.MetaCaption
            }>{`${sex}, ${age} years old`}</Typography>
        </Grid>
      </Grid>
      <Grid container item direction="column" xs={5}>
        <Chip
          variant="default"
          size="small"
          label={`${riskLevel} Risk`}
          className={classes.TagContainer}
        />
      </Grid>
    </Grid>
  );
};

export const QueueTableView = () => {
  const classes = pageStyles();

  const renderPatientCell = row => (
    <PatientMetadatumView
      name={`${row.patient.firstName} ${row.patient.lastName}`}
      sex={row.patient.sex}
      age={row.patient.age}
      riskLevel={row.patientCase.riskLevel}
    />
  );

  const renderTeamCell = row => {
    const classes = teamSectionStyles({ status: row.task.status });
    return (
      <TeamTag
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
  const buildPendingSection = () => {
    return <DataTable headers={headers} data={store} />;
  };
  return (
    <Fragment>
      <Container className={classes.PageContainer}>
        <Fragment>
          <Typography className={classes.TextContainer}>
            {'2 pending'}
          </Typography>
          {buildPendingSection()}
        </Fragment>
      </Container>
    </Fragment>
  );
};
