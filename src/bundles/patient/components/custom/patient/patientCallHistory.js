import React, { Fragment } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  CallHistoryHeaders: {
    color: '#BDB8D9',
    fontSize: 15,
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
  }
}));

export const PatientCallHistory = ({ patient }) => {
  console.log(patient, 'patient details');
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Grid container style={{ padding: '12px 0' }}>
            <Grid xs={3} classes={{ root: classes.CallHistoryHeaders }}>
              Date & Time
            </Grid>
            <Grid xs classes={{ root: classes.CallHistoryHeaders }}>
              Call summary
            </Grid>
          </Grid>
          <Grid container style={{ padding: '12px 0' }}>
            <Grid xs={3} classes={{ root: classes.CallHistoryDateDisplay }}>
              Date & Time
            </Grid>
            <Grid xs classes={{ root: classes.CallHistoryHeaders }}>
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center">
            <div>oreofe</div>
            <div>olutola</div>
          </Box>
        </Grid>
      </Grid>
      <Grid container style={{ padding: '12px 0' }}>
        <Grid xs={3} classes={{ root: classes.CallHistoryHeaders }}>
          Date & Time
        </Grid>
        <Grid xs classes={{ root: classes.CallHistoryHeaders }}>
          Additional Information from the call
        </Grid>
      </Grid>
      <Grid container style={{ padding: '12px 0' }}>
        <Grid xs={3} classes={{ root: classes.CallHistoryDateDisplay }}>
          31 Mar, 7:54 PM
        </Grid>
        <Grid xs classes={{ root: classes.CallHistoryNotes }}>
          Patient feels better
        </Grid>
      </Grid>
      <Grid container style={{ padding: '12px 0' }}>
        <Grid xs={3} classes={{ root: classes.CallHistoryDateDisplay }}>
          31 Mar, 11:12 AM
        </Grid>
        <Grid xs classes={{ root: classes.CallHistoryNotes }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut
          metus diam. Cras ac augue id massa vestibulum blandit. Donec eget
          lorem lobortis, pulvinar lacus sed, congue enim. Ut ligula tortor,
          egestas sagittis risus ut, dignissim rhoncus orci. Sed semper, quam
          vitae iaculis mollis, ex.
        </Grid>
      </Grid>
      <Grid container style={{ padding: '12px 0' }}>
        <Grid xs={3} classes={{ root: classes.CallHistoryDateDisplay }}>
          28 Mar, 1:32 PM
        </Grid>
        <Grid xs classes={{ root: classes.CallHistoryNotes }}>
          First call - gathered all the info in “patient details” section
        </Grid>
      </Grid>
    </Fragment>
  );
};
