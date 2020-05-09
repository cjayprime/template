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
  }
}));

export const PatientCallHistory = ({ patient }) => {
  console.log(patient, 'patient details');
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container style={{ padding: '12px 0' }}>
        <Grid xs="3" classes={{ root: classes.CallHistoryHeaders }}>
          Date & Time
        </Grid>
        <Grid xs classes={{ root: classes.CallHistoryHeaders }}>
          Additional Information from the call
        </Grid>
      </Grid>
      <Grid container style={{ padding: '12px 0' }}>
        <Grid xs="3" classes={{ root: classes.CallHistoryDateDisplay }}>
          31 Mar, 7:54 PM
        </Grid>
        <Grid xs classes={{ root: classes.CallHistoryNotes }}>
          Patient feels better
        </Grid>
      </Grid>
      <Grid container style={{ padding: '12px 0' }}>
        <Grid xs="3" classes={{ root: classes.CallHistoryDateDisplay }}>
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
        <Grid xs="3" classes={{ root: classes.CallHistoryDateDisplay }}>
          28 Mar, 1:32 PM
        </Grid>
        <Grid xs classes={{ root: classes.CallHistoryNotes }}>
          First call - gathered all the info in “patient details” section
        </Grid>
      </Grid>
    </Fragment>
  );
};
