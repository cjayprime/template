import React, { Fragment } from 'react';
import { DataTable, PatientMetadatum } from 'bundles/shared/components';
import { QueuePageStyles } from 'bundles/queue/components/Views/QueueTable/index.style';
import { Link } from 'react-router-dom';
import withPatient from 'bundles/patient/hoc/withPatient';
import { Typography, ButtonBase, Grid } from '@material-ui/core';
import { useStyles } from 'bundles/patient/components/custom/filter/index.style';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import PatientTab from 'bundles/patient/components/custom/patient/tab';
import notfound from 'images/notfound.png';
// import moment from 'moment';

const compose = require('lodash')?.flowRight;

const renderPatientCell = row => (
  <PatientMetadatum
    name={`${row.patient.firstName} ${row.patient.lastName}`}
    sex={row.patient.sex}
    age={row.patient.age}
    riskLevel={row.patientCase.riskLevel}
  />
);

const renderActionComponent = row => {
  const classes = QueuePageStyles();

  return (
    <Typography className={classes.ActionButton}>
      {row.task.acceptedBy}
    </Typography>
  );
};

const List = ({ header, data }) => {
  return (
    <DataTable
      headers={header}
      data={data}
      renderCollapsible={row => <PatientTab />}
    />
  );
}; 

const expand = () => {
  return <KeyboardArrowDown />;
};

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
      <Grid item>
        <img src={notfound} />
      </Grid>

      <Grid item>
        <ButtonBase
          to="/CreatePatient"
          className={classes.button}
          component={Link}>
          <Typography
            color="primary"
            style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
            LOG A CALL
          </Typography>
        </ButtonBase>
      </Grid>
    </Grid>
  );
};

const RenderList = ({ patients = [] }) => {
  const remap = patients.map(patient => {
    return {
      patient: {
        firstName: patient.firstname,
        lastName: patient.lastname,
        sex: patient.sex,
        age: 30 || patient.birthDate // moment().diff(patient.birthDate,'years') : '',
      },
      patientCase: {
        riskLevel: patient.patientCasesByPatientId.nodes.length
          ? patient.patientCasesByPatientId.nodes[0].riskLevel
          : ''
      },
      task: {
        status: patient.patientCasesByPatientId.nodes.length
          ? patient.patientCasesByPatientId.nodes[0].status
          : '',
        acceptedBy: 'FORWARD',
        requestDate: patient.phoneNumber,
        epidNumber: patient.epidNumber,
        expand: 'EXPAND'
      }
    };
  });

  const headers = [
    { name: 'PATIENT', accessor: renderPatientCell },
    { name: 'PHONE NUMBER', accessor: 'task.requestDate' },
    { name: 'STATUS', accessor: 'task.status' },
    { name: 'EPID NO.', accessor: 'task.epidNumber' },
    { name: '', accessor: renderActionComponent },
    { name: '', accessor: expand }
  ];

  return (
    <Fragment>
      {remap.length > 0 ? (
        <List header={headers} data={remap} />
      ) : (
        <ErrorContainer />
      )}
    </Fragment>
  );
};

export default compose(withPatient)(RenderList);
