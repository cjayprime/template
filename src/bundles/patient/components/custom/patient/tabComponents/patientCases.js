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
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';
import { CreateTriage } from 'bundles/caseTriage/CreateTriage';
import { PatientMetadatum } from 'bundles/shared/components/PatientMetadatum';

export const PatientCases = ({ patientCase, patient }) => {
  const useStyle = makeStyles(theme => ({
    Table: {
      backgroundColor: 'transparent'
    },
    HeaderTableCell: {
      color: '#8F8D8C',
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
      color: '#ED666B',
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
      color: '#231E1E'
    }
  }));
  const classes = useStyle();
  const [showTriageAnswers, setShowTriageAnswers] = useState(false);
  const [selectedTriageAnswers, setSelectedTriageAnswers] = useState({});

  const renderCaseActionComponent = row => {
    let answers;
    try {
      answers = JSON.parse(row.triageAnswerByTriageAnswerId.answers) || {};
    } catch (err) {
      answers = {};
    }
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

  return (
    <>
      <DataTable
        headers={caseHeader}
        noBorder={true}
        data={patientCase.cases}
        styles={classes}
      />
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
                  <Typography style={{ color: '#685E5E', fontSize: 15 }}>
                    Date
                  </Typography>
                  <Typography style={{ color: '#231E1E', fontSize: 13 }}>
                    Date
                  </Typography>
                </Grid>
                <Grid xs={2}>
                  <Typography style={{ color: '#685E5E', fontSize: 15 }}>
                    Epid No.
                  </Typography>
                  <Typography style={{ color: '#231E1E', fontSize: 13 }}>
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
