import React, { useState } from 'react';
import {
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Typography
} from '@material-ui/core';
import { DataTable } from 'bundles/shared/components/Datatable';
import { withRouter } from 'react-router';
import { saveCurrentPatient } from 'bundles/patient/actions';
import moment from 'moment';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { CreateTriage } from 'bundles/caseTriage/CreateTriage';
import { PatientMetadatum } from 'bundles/shared/components/PatientMetadatum';

 const PatientCases = ({ patientCase, patient, savePatient, history }) => {
  const useStyle = makeStyles(theme => ({
    Table: {
      backgroundColor: 'transparent'
    },
    HeaderTableCell: {
      color: '#BDB8D9',
      fontSize: 13,
      textTransform: 'uppercase',
      fontWeight: 400,
      border: 0,
      paddingTop: 0,
      paddingBottom: 12,
      '&:first-child': {
        paddingLeft: 0
      },
      '&:last-child': {
        maxWidth: 150
      },
      '&:nth-child(5)': {
        width: '40%'
      }
    },
    TableCell: {
      padding: 11,
      textTransform: 'capitalize',
      '&:first-child': {
        paddingLeft: 0,
        fontWeight: 600
      },
      '&:nth-child(5)': {
        maxWidth: 150,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    },
    ActionButton: {
      color: '#EEBEC2',
      fontSize: 13,
      fontWeight: 'bold',
      padding: '5px 0'
    },
    dialog: {
      backgroundColor: 'transparent',
      // backgroundColor: '#2B2D40',
      boxShadow: 'none'
    },
    dialogheaderText: {
      fontSize: 24,
      color: '#fff',
      textAlign: 'center'
    },
    dialogContainer: {
      backgroundColor: 'rgba(44, 46, 65, 0.7)',
      backdropFilter: 'blur(4px)'
    },
    dialogCloseButton: {
      position: 'fixed',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: '#fff'
    }
  }));
  const classes = useStyle();
  const [showTriageAnswers, setShowTriageAnswers] = useState(false);
  const [selectedTriageAnswers, setSelectedTriageAnswers] = useState({});
  const [triageAnswer, setTriageAnswer] = useState(false)

  const renderCaseActionComponent = row => {
    let answers;
    try {
      answers = JSON.parse(row.triageAnswerByTriageAnswerId.answers) || {};
    } catch (err) {
      answers = {};
    }


   
    setTriageAnswer(row?.triageAnswerByTriageAnswerId ? true: false)

    return (
      <Button
        disabled={!row.triageAnswerByTriageAnswerId}
        onClick={() => displayCaseTriageAnswerDialog(answers)}
        className={classes.ActionButton}>
        View Details
      </Button>
    );
  };

  const displayCaseTriageAnswerDialog = triageAnswers => {
    setShowTriageAnswers(true);
    setSelectedTriageAnswers(triageAnswers);
  };

  const hideCaseTriageAnswerDialog = () => {
    setShowTriageAnswers(false);
    setSelectedTriageAnswers(null);
  };

  const renderCaseDateComponent = row => (
    <>{moment(row.createdAt).format('DD MMM, h:mm A')}</>
  );

  const caseHeader = [
    { name: 'DATE', accessor: renderCaseDateComponent },
    { name: 'SUBMITTED BY', accessor: 'submittedBy' },
    { name: 'EPID NO', accessor: 'epidNumber' },
    { name: 'TYPE', accessor: 'type' },
    { name: 'NOTES', accessor: 'notes' },
    { name: 'ACTION', accessor: renderCaseActionComponent }
  ];

  const startTriage = () => {
    savePatient(patient)
    history.push('/CreateTriage')
  }

  return (
    <>
      <DataTable
        headers={caseHeader}
        noBorder={true}
        data={patientCase.cases}
        styles={classes}
      />
      
      <Grid container >
       {!triageAnswer  ? 
         <Button
          //disabled={!row.triageAnswerByTriageAnswerId}
          onClick={() => startTriage()}
          className={classes.ActionButton}
          >
          Triage Patient
        </Button>  : null
       }
      </Grid>
      
      <Dialog
        fullScreen
        open={showTriageAnswers}
        onClose={hideCaseTriageAnswerDialog}
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
          onClick={hideCaseTriageAnswerDialog}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="form-dialog-title">
          <Grid container justify="center">
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={4}>
                  <PatientMetadatum
                    name={`${patient.firstName} ${patient.lastName}`}
                    sex={patient.sex}
                    age={patient.age}
                    riskLevel={patientCase.riskLevel}
                  />
                </Grid>
                <Grid xs={2}>
                  <Typography style={{ color: '#BDB8D9', fontSize: 15 }}>
                    Date
                  </Typography>
                  <Typography style={{ color: '#fff', fontSize: 13 }}>
                    Date
                  </Typography>
                </Grid>
                <Grid xs={2}>
                  <Typography style={{ color: '#BDB8D9', fontSize: 15 }}>
                    Epid No.
                  </Typography>
                  <Typography style={{ color: '#fff', fontSize: 13 }}>
                    {patient.epidNumber}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container justify="center">
            <Grid xs={6}>
              <CreateTriage
                showFooter={() => {}}
                canEdit={false}
                triageAnswers={selectedTriageAnswers}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  savePatient: value => dispatch(saveCurrentPatient(value)),
});


export default withRouter(connect(null, mapDispatchToProps)(PatientCases));