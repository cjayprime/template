import React, { Fragment, useState } from 'react';
import classnames from 'classnames';
import {
  Grid,
  makeStyles,
  OutlinedInput,
  FormControlLabel,
  Typography,
  Button
} from '@material-ui/core';
import moment from 'moment';

import { DefaultCheckbox } from 'bundles/patient/components/custom/formBuilder';

const useStyles = makeStyles(theme => ({
  CallHistoryHeaders: {
    color: '#BDB8D9',
    fontSize: 13,
    textTransform: 'uppercase'
  },
  CallHistoryDateDisplay: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  CallHistoryNotes: {
    color: '#fff',
    fontSize: 14,
    paddingRight: 20
  },
  CallSummaryNotesInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`
    },
    backgroundColor: '#474562',
    color: '#fff'
  },
  CallSummaryNotesInputFocused: {},
  CallSummaryNotesInputNotch: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`
    },
    borderWidth: '1px',
    borderColor: 'transparent !important',
    color: 'white'
  },
  regLabelText: {
    fontSize: 15,
    color: '#fff'
  },
  formButton: {
    boxShadow: 'none',
    borderRadius: 20,
    textTransform: 'none',
    border: 'none',
    color: 'white',
    lineHeight: 1.5,
    fontSize: 16,
    padding: '10px 50px 10px'
  },
  formButtonTS: {
    backgroundColor: '#28BAC0',
    boxShadow:
      '0 6px 16px rgba(39, 186, 192, 0.20), 0 2px 10px rgba(39, 186, 192, 0.10)',
    '&:hover': {
      backgroundColor: '#28BAC0',
      border: 'none'
    },
    '&:active': {
      backgroundColor: '#28BAC0',
      border: 'none'
    }
  }
}));

export const PatientCallHistory = ({ callLogs, patient, newCallLog }) => {
  const classes = useStyles();
  // const [showNewCallLog, setShowNewCallLog] = useState(true);
  const newLogObject = {
    callSummary: '',
    callTime: new Date(),
    submittedBy: 1, // TODO: link this up with a real user
    callOrigin: 'DIRECT_CONTACT',
    patientId: patient.id
  };
  const [newLog, setNewLog] = useState(newLogObject);

  const setCallSummary = event => {
    setNewLog({
      ...newLog,
      callSummary: event.target.value
    });
  };

  const saveNewLog = async () => {
    try {
      await newCallLog(newLog);
      setNewLog(newLogObject);
    } catch (err) {
      // do something with error here
    }
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Grid container style={{ padding: '0 0 12px' }}>
            <Grid item xs={3} classes={{ root: classes.CallHistoryHeaders }}>
              Date & Time
            </Grid>
            <Grid item xs classes={{ root: classes.CallHistoryHeaders }}>
              Call summary
            </Grid>
          </Grid>
          <Grid container style={{ padding: '12px 0' }}>
            <Grid
              item
              xs={3}
              classes={{ root: classes.CallHistoryDateDisplay }}>
              Now
            </Grid>
            <Grid item xs classes={{ root: classes.CallHistoryHeaders }}>
              <OutlinedInput
                fullWidth
                multiline
                rows={5}
                placeholder="Enter additional information"
                variant="outlined"
                onChange={setCallSummary}
                value={newLog.callSummary}
                classes={{
                  root: classes.CallSummaryNotesInput,
                  focused: classes.CallSummaryNotesInputFocused,
                  notchedOutline: classes.CallSummaryNotesInputNotch
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ padding: '20px 0', borderBottom: '#59596F 1px solid' }}>
          <Grid container>
            <Grid item xs={6}>
              <FormControlLabel
                control={<DefaultCheckbox name="sendEmergencyNumberToCaller" />}
                label={
                  <Typography classes={{ root: classes.regLabelText }}>
                    {' '}
                    Send Emergency Number to caller
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end">
                <Button className={classes.formButton}>CANCEL</Button>
                <Button
                  disableElevation={false}
                  onClick={saveNewLog}
                  className={classnames(
                    classes.formButton,
                    classes.formButtonTS
                  )}>
                  SAVE
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container style={{ padding: '12px 0' }}>
        <Grid item xs={3} classes={{ root: classes.CallHistoryHeaders }}>
          Date & Time
        </Grid>
        <Grid item xs classes={{ root: classes.CallHistoryHeaders }}>
          Additional Information from the call
        </Grid>
      </Grid>
      {callLogs.map(log => (
        <Grid container style={{ padding: '12px 0' }} key={log.id}>
          <Grid item xs={3} classes={{ root: classes.CallHistoryDateDisplay }}>
            {moment(log.callTime).format('DD MMM, h:mm a')}
          </Grid>
          <Grid item xs classes={{ root: classes.CallHistoryNotes }}>
            {log.callSummary}
          </Grid>
        </Grid>
      ))}
    </Fragment>
  );
};
