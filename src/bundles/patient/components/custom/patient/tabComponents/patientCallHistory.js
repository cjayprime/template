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

export const PatientCallHistory = ({ patient }) => {
  const classes = useStyles();
  const [showNewCallLog, setShowNewCallLog] = useState(true);

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
      <Grid container style={{ padding: '12px 0' }}>
        <Grid item xs={3} classes={{ root: classes.CallHistoryDateDisplay }}>
          31 Mar, 7:54 PM
        </Grid>
        <Grid item xs classes={{ root: classes.CallHistoryNotes }}>
          Patient feels better
        </Grid>
      </Grid>
      <Grid container style={{ padding: '12px 0' }}>
        <Grid item xs={3} classes={{ root: classes.CallHistoryDateDisplay }}>
          31 Mar, 11:12 AM
        </Grid>
        <Grid item xs classes={{ root: classes.CallHistoryNotes }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut
          metus diam. Cras ac augue id massa vestibulum blandit. Donec eget
          lorem lobortis, pulvinar lacus sed, congue enim. Ut ligula tortor,
          egestas sagittis risus ut, dignissim rhoncus orci. Sed semper, quam
          vitae iaculis mollis, ex.
        </Grid>
      </Grid>
      <Grid container style={{ padding: '12px 0' }}>
        <Grid item xs={3} classes={{ root: classes.CallHistoryDateDisplay }}>
          28 Mar, 1:32 PM
        </Grid>
        <Grid item xs classes={{ root: classes.CallHistoryNotes }}>
          First call - gathered all the info in “patient details” section
        </Grid>
      </Grid>
    </Fragment>
  );
};
