import React, { Fragment } from 'react';
import { DataTable, PatientMetadatum } from 'bundles/shared/components';
import { QueuePageStyles } from 'bundles/queue/components/Views/QueueTable/index.style';
import { Link } from 'react-router-dom';
import withPatient from 'bundles/patient/hoc/withPatient';
import markPatientDead from 'bundles/patient/hoc/markPatientDeceased';
import { Typography, ButtonBase, Grid, makeStyles } from '@material-ui/core';
import { useStyles } from 'bundles/patient/components/custom/filter/index.style';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import PatientTab from 'bundles/patient/components/custom/patient/tab';
import notfound from 'images/notfound.png';
import moment from 'moment';

const compose = require('lodash')?.flowRight;

const renderPatientCell = row => (
  <PatientMetadatum
    name={`${row.patient.firstName} ${row.patient.lastName}`}
    sex={row.patient.sex}
    age={row.patient.age}
    riskLevel={row.patientCase.riskLevel}
  />
);

const List = ({ header, data, markPatientDeceased }) => {
  const useStyle = makeStyles(() => ({
    HeaderTableCell: {
      borderBottom: '0'
    },
    collapseRowGroup: {},
    collapseRowParent: {
      '&.open td': {
        backgroundColor: '#3A3C4F'
      },
      '&.open td:first-child': {
        borderTopLeftRadius: 8
      },
      '&.open td:last-child': {
        borderTopRightRadius: 8
      }
    },
    collapseRowChild: {
      '& > td': {
        backgroundColor: '#3A3C4F',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
      }
    }
  }));

  const styles = useStyle();
  return (
    <DataTable
      headers={header}
      data={data}
      styles={styles}
      renderCollapsible={row => (
        <PatientTab
          patientData={row}
          markPatientDeceased={markPatientDeceased}
        />
      )}
    />
  );
};

const expand = () => {
  return (
    <Grid container alignItems="center" justify="flex-end">
      {/* <Typography style={{ textTransform: 'uppercase', marginRight: 5 }}>
        Expand
      </Typography> */}
      <KeyboardArrowDown />
    </Grid>
  );
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
        <img src={notfound} alt="" />
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

const RenderList = ({ patients = [], markPatientDeceased }) => {
  const remap = patients.map(patient => {
    return {
      patient: {
        id: patient.id,
        firstName: patient.firstname,
        lastName: patient.lastname,
        sex: patient.sex,
        age: patient.birthDate ? moment().diff(patient.birthDate, 'years') : '',
        phoneNumber: patient.phoneNumber,
        email: patient.email,
        countryOfResidence: patient.countryOfResidence,
        lga: patient.lga,
        notes: patient.notes || '-',
        location: patient.location,
        nationality: patient.nationality,
        occupation: patient.occupation,
        epidNumber: patient.epidNumber,
        address: `
        ${patient.streetName ? `${patient.streetName}, ` : ''}
        ${patient.streetName2 ? `${patient.streetName2},` : ''}
        ${patient.city ? `${patient.city},` : ''}
        ${patient.state ? `${patient.state} State` : ''}`
      },
      callLogs: patient.callLogsByPatientId.nodes || [],
      patientCase: {
        riskLevel: patient.patientCasesByPatientId.nodes.length
          ? patient.patientCasesByPatientId.nodes[0].riskLevel
          : '',
        status:
          patient.patientCasesByPatientId.nodes.length > 0
            ? patient.patientCasesByPatientId.nodes[0].status
            : '',
        cases:
          patient.patientCasesByPatientId.nodes.map(patientCase => {
            return {
              ...patientCase,
              epidNumber: patient.epidNumber,
              submittedBy: `${
                patientCase.userBySubmittedBy.title
                  ? `${patientCase.userBySubmittedBy.title} `
                  : ''
              }${patientCase.userBySubmittedBy.firstname} ${
                patientCase.userBySubmittedBy.lastname
              }`
            };
          }) || []
      },
      labRequest:
        patient.labRequestsByPatientId.nodes.map(labRequest => {
          return {
            ...labRequest,
            requestedBy: `${
              labRequest.userByRequestedBy.title
                ? `${labRequest.userByRequestedBy.title} `
                : ''
            }${labRequest.userByRequestedBy.firstname} ${
              labRequest.userByRequestedBy.lastname
            }`,
            status: labRequest.labRequestStatusesByLabRequestId.nodes[0].status
          };
        }) || [],
      inpatient:
        patient.patientLocationsByPatientId.nodes.map(admissionData => {
          return {
            ...admissionData,
            admittedBy: `${
              admissionData.userByAdmittedBy.title
                ? `${admissionData.userByAdmittedBy.title} `
                : ''
            }${admissionData.userByAdmittedBy.firstname} ${
              admissionData.userByAdmittedBy.lastname
            }`
          };
        }) || [],
      deceasedPatient: patient.deceasedPatientByPatientId,
      // task: {
      //   status: patient.patientCasesByPatientId.nodes.length
      //     ? patient.patientCasesByPatientId.nodes[0].status
      //     : '',
      //   acceptedBy: 'FORWARD',
      //   requestDate: patient.phoneNumber,
      //   epidNumber: patient.epidNumber,
      //   expand: 'EXPAND'
      // }
    };
  });

  const headers = [
    { name: 'PATIENT', accessor: renderPatientCell },
    { name: 'PHONE NUMBER', accessor: 'patient.phoneNumber' },
    { name: 'STATUS', accessor: 'patientCase.status' },
    { name: 'EPID NO.', accessor: 'patient.epidNumber' },
    { name: '', accessor: expand }
  ];

  return (
    <Fragment>
      {remap.length > 0 ? (
        <List
          header={headers}
          data={remap}
          markPatientDeceased={markPatientDeceased}
        />
      ) : (
        <ErrorContainer />
      )}
    </Fragment>
  );
};

export default compose(withPatient, markPatientDead)(RenderList);
