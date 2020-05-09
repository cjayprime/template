import React, { Fragment } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  PatientDetailsSectionHeader: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 500
  },
  PatientDetailValueHeader: {
    color: '#BDB8D9',
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: 600
  },
  PatientDetailValueContent: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 400,
    paddingRight: 20,
    lineHeight: '1.4'
  }
}));

export const PatientDetails = ({ patient }) => {
  console.log(patient, 'patient details');
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container>
        <Grid item xs="3">
          <Typography classes={{ root: classes.PatientDetailsSectionHeader }}>
            Contact Information
          </Typography>
        </Grid>
        <Grid item xs="5">
          <div>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              Phone Number
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              +1234567890
            </Typography>
          </div>
          <div style={{ marginTop: 15 }}>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              Address
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              Street Name, Address line 2, State, City Street Name, Address line
              2, State, City Street Name, Address line 2, State, City
            </Typography>
          </div>
        </Grid>
        <Grid item xs="4">
          <Typography classes={{ root: classes.PatientDetailValueHeader }}>
            Email
          </Typography>
          <Typography classes={{ root: classes.PatientDetailValueContent }}>
            email@domain.com
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: 30 }}>
        <Grid item xs="3">
          <Typography classes={{ root: classes.PatientDetailsSectionHeader }}>
            Other
          </Typography>
        </Grid>
        <Grid item xs="5">
          <div>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              LGA
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              Kosofe
            </Typography>
          </div>
          <div style={{ marginTop: 15 }}>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              Nationality
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              Nigerian
            </Typography>
          </div>
          <div style={{ marginTop: 15 }}>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              Location
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              Gbagada
            </Typography>
          </div>
        </Grid>
        <Grid item xs="4">
          <div>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              Country of Residence
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              Nigeria
            </Typography>
          </div>
          <div style={{ marginTop: 15 }}>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              Occupation
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              Healthcare Worker
            </Typography>
          </div>
          <div style={{ marginTop: 15 }}>
            <Typography classes={{ root: classes.PatientDetailValueHeader }}>
              Other
            </Typography>
            <Typography classes={{ root: classes.PatientDetailValueContent }}>
              Lorem Ipsum some stuff here
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};
