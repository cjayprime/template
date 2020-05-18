import React, { Fragment } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  PatientDetailsSectionHeader: {
    fontSize: 15,
    color: '#231E1E',
    fontWeight: 500
  },
  PatientDetailValueHeader: {
    color: '#8F8D8C',
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: 600
  },
  PatientDetailValueContent: {
    color: '#231E1E',
    fontSize: 14,
    fontWeight: 400,
    paddingRight: 20,
    lineHeight: '1.4',
    textTransform: 'capitalize'
  }
}));

export const PatientDetails = ({ patient }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={3}>
          <Typography classes={{ root: classes.PatientDetailsSectionHeader }}>
            Contact Information
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <div>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              Phone Number
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              {patient.phoneNumber || '-'}
            </Typography>
          </div>
          <div style={{ marginTop: 15 }}>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              Address
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              {patient.address || '-'}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <Typography classes={{ root: classes.PatientDetailValueHeader }}>
            Email
          </Typography>
          <Typography classes={{ root: classes.PatientDetailValueContent }}>
            {patient.email || '-'}
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: 30 }}>
        <Grid item xs={3}>
          <Typography classes={{ root: classes.PatientDetailsSectionHeader }}>
            Other
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <div>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              LGA
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              {patient.lga || '-'}
            </Typography>
          </div>
          <div style={{ marginTop: 15 }}>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              Nationality
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              {patient.nationality || '-'}
            </Typography>
          </div>
          <div style={{ marginTop: 15 }}>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              Location
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              {patient.location || '-'}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              Country of Residence
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              {patient.countryOfResidence || '-'}
            </Typography>
          </div>
          <div style={{ marginTop: 15 }}>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              Occupation
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              {patient.occupation || '-'}
            </Typography>
          </div>
          <div style={{ marginTop: 15 }}>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              Other
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              {patient.notes || '-'}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

PatientDetails.defaultProps = {
  patient: {}
};
