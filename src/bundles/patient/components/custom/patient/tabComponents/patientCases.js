import React, { useState } from 'react';
import {
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid
} from '@material-ui/core';
import { DataTable } from 'bundles/shared/components/Datatable';
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';
import { CreateTriage } from 'bundles/caseTriage/CreateTriage';

export const PatientCases = ({ patientCase }) => {
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
  const [selectedTriageAnswers, setSelectedTriageANswers] = useState({});

  const renderCaseActionComponent = row => {
    console.log(row, 'row');
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
    setSelectedTriageANswers(triageAnswers);
  };

  const hideCaseTriageAnswerDialog = () => {
    setShowTriageAnswers(false);
    setSelectedTriageANswers(null);
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
        <DialogTitle id="form-dialog-title"></DialogTitle>
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
