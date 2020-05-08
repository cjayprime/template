import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import select from 'images/iconnew.png';
import FormBuilder from 'bundles/patient/components/custom/formBuilder';
import { useStyles } from 'bundles/patient/components/custom/patient/index.style';

const NewAppointment = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      spacing={3}
      justify="center"
      alignItems="center"
      style={{ height: '80vh', backgroundColor: '' }}>
      <Grid item>
        <Button
          style={{
            border: '1px solid #3A3C4F',
            borderRadius: 10,
            justifyContent: 'left',
            width: 650,
            height: 85,
            padding: 10,
            boxShadow: `5px 5px 9px 3px #282a3d`,
            backgroundColor: '#3A3C4F',
            margin: 10,
            color: '#fff'
          }}>
          <img src={select} />
          <Typography style={{ fontSize: 18, marginLeft: 20 }}>
            {' '}
            Add patient
          </Typography>
        </Button>
      </Grid>

      <Grid item style={{ width: 660 }}>
        <FormBuilder
          formInput={{
            type: 'date',
            label: 'Date',
            fields: ['one', 'two', 'three', 'four']
          }}
          formState={{}}
          setFormState={() => ''}
        />
      </Grid>
      <Grid item style={{ width: 660 }}>
        <FormBuilder
          formInput={{
            type: 'date',
            label: 'Time',
            fields: ['one', 'two', 'three', 'four']
          }}
          formState={{}}
          setFormState={() => ''}
        />
      </Grid>
      <Grid item style={{ width: 660 }}>
        <FormBuilder
          formInput={{
            type: 'select',
            label: 'Team',
            fields: ['one', 'two', 'three', 'four']
          }}
          formState={{}}
          setFormState={() => ''}
        />
      </Grid>
      <Grid item style={{ width: 660 }}>
        <FormBuilder
          formInput={{
            type: 'select',
            label: 'Reason',
            fields: ['one', 'two', 'three', 'four']
          }}
          formState={{}}
          setFormState={() => ''}
        />
      </Grid>

      <Grid>
        <Button
          onClick={() => ''}
          className={classes.regButtons}
          style={{ boxShadow: `5px 5px 9px 3px #282a3d`, width: 650, marginTop: 10, height: 58, fontSize: 18 }}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewAppointment;
