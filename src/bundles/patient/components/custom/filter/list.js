import React, { Fragment, useState } from 'react';
import { DataTable, PatientMetadatum } from 'bundles/shared/components';

import { Link } from 'react-router-dom';
import withPatient from 'bundles/patient/hoc/withPatient';
import markPatientDead from 'bundles/patient/hoc/markPatientDeceased';
import createNewCallLog from 'bundles/patient/hoc/createNewCallLog';
import {
  Typography,
  ButtonBase,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
  IconButton
} from '@material-ui/core';
import { useStyles } from 'bundles/patient/components/custom/filter/index.style';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import PatientTab from 'bundles/patient/components/custom/patient/tab';
import notfound from 'images/notfound_alt.png';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';

const compose = require('lodash')?.flowRight;

const ownStyles = makeStyles(theme => ({
  dialog: {
    backgroundColor: 'transparent',
    // backgroundColor: '#2B2D40',
    boxShadow: 'none'
  },
  dialogheaderText: {
    fontSize: 24,
    color: '#231E1E',
    textAlign: 'center'
  },
  dialogContainer: {
    backgroundColor: 'rgba(246, 246, 246, 0.7)',
    backdropFilter: 'blur(4px)'
  },
  dialogCloseButton: {
    position: 'fixed',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#fff'
  },
  radio: {
    color: '#231E1E'
  },
  radioChecked: {
    color: '#6EA915 !important'
  },
  primaryButton: {
    backgroundColor: '#6EA915',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    borderRadius: 50,
    textTransform: 'uppercase',
    maxWidth: 270,
    boxShadow:
      '0 6px 16px rgba(110, 169, 21, 0.20), 0 2px 10px rgba(110, 169, 21, 0.10)',
    '&:hover': {
      backgroundColor: '#6EA915',
      color: '#fff',
      fontSize: 13
    }
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#231E1E',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    borderRadius: 50,
    textTransform: 'uppercase',
    maxWidth: 270,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#fff',
      fontSize: 13,
      boxShadow: 'none'
    }
  }
}));

const renderPatientCell = row => (
  <PatientMetadatum
    name={`${row.patient.firstName} ${row.patient.lastName}`}
    sex={row.patient.sex}
    age={row.patient.age}
    riskLevel={row.patientCase.riskLevel}
  />
);

const List = ({ header, data, markPatientDeceased, newCallLog }) => {
  const useStyle = makeStyles(() => ({
    HeaderTableCell: {
      borderBottom: '0'
    },
    collapseRowGroup: {},
    collapseRowParent: {
      '&.open td': {
        backgroundColor: '#FFFFFF'
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
        backgroundColor: '#F9F9F9',
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
          newCallLog={newCallLog}
        />
      )}
    />
  );
};

const expand = () => {
  return (
    <Grid container alignItems="center" justify="flex-end">
      <Typography style={{ textTransform: 'uppercase', marginRight: 5 }}>
        Expand
      </Typography>
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
            Register a patient
          </Typography>
        </ButtonBase>
      </Grid>
    </Grid>
  );
};

const RenderList = ({ patients = [], markPatientDeceased, newCallLog }) => {
  const classes = ownStyles();
  const [openForwardModal, setOpenForwardModal] = useState(false);
  const [selectedPatientIdId, setSelectedPatient] = useState();
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
      deceasedPatient: patient.deceasedPatientByPatientId
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

  const forwardPatientToTeam = patientId => {
    setOpenForwardModal(true);
    setSelectedPatient(patientId);
  };

  const closeForwardDialog = () => {
    setOpenForwardModal(false);
    setSelectedPatient(null);
  };

  const forward = row => {
    return (
      <Grid container alignItems="center" justify="flex-end">
        <ButtonBase
          onClick={e => {
            e.stopPropagation();
            forwardPatientToTeam(row.patient.id);
          }}
          style={{
            textTransform: 'uppercase',
            marginRight: 5,
            color: '#6EA915',
            fontWeight: 'bold'
          }}>
          Forward
        </ButtonBase>
      </Grid>
    );
  };

  const headers = [
    { name: 'PATIENT', accessor: renderPatientCell },
    { name: 'PHONE NUMBER', accessor: 'patient.phoneNumber' },
    { name: 'STATUS', accessor: 'patientCase.status' },
    { name: 'EPID NO.', accessor: 'patient.epidNumber' },
    { name: '', accessor: forward },
    { name: '', accessor: expand }
  ];

  return (
    <Fragment>
      {remap.length > 0 ? (
        <List
          header={headers}
          data={remap}
          markPatientDeceased={markPatientDeceased}
          newCallLog={newCallLog}
        />
      ) : (
        <ErrorContainer />
      )}
      <Dialog
        open={openForwardModal}
        onClose={closeForwardDialog}
        fullWidth={true}
        classes={{
          paper: classes.dialog,
          root: classes.dialogRoot,
          container: classes.dialogContainer
        }}
        maxWidth={'sm'}>
        <IconButton
          aria-label="close"
          className={classes.dialogCloseButton}
          onClick={closeForwardDialog}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="form-dialog-title">
          <Typography className={classes.dialogheaderText}>
            Forward to Queue
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container justify="center" style={{ marginTop: 24 }}>
            <RadioGroup name="stimuli">
              {['RRT', 'Psychosocial', 'Evac & Decon', 'Epid/Surveillance'].map(
                option => (
                  <FormControlLabel
                    key={`team-${option}`}
                    value={option}
                    control={
                      <Radio
                        classes={{
                          colorPrimary: classes.radio,
                          checked: classes.radioChecked,
                        }}
                      />
                    }
                    label={option}
                    classes={{
                      root: classes.radio
                    }}
                  />
                )
              )}
            </RadioGroup>
          </Grid>
        </DialogContent>
        <div style={{ margin: '10px 0' }}>
          <Box display="flex" justifyContent="center">
            <Button
              fullWidth={true}
              variant="contained"
              onClick={closeForwardDialog}
              color="primary"
              classes={{ root: classes.primaryButton }}>
              FORWARD
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" style={{ marginTop: 15 }}>
            <Button
              onClick={closeForwardDialog}
              classes={{
                root: classes.secondaryButton,
                focusVisible: classes.secondaryButton
              }}
              variant="contained">
              CANCEL
            </Button>
          </Box>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default compose(
  withPatient,
  markPatientDead,
  createNewCallLog
)(RenderList);
