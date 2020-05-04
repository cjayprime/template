import React, { Fragment, useState } from 'react';

import { Grid, Typography } from '@material-ui/core';
import Header from './custom/header';
import ContactStatus from './custom/contactStatus';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FormBuilder from './custom/formBuilder';
import { makeStyles } from '@material-ui/core/styles';
import { QUESTIONS } from './custom/questions';

const compose = require('lodash')?.flowRight;

const useStyles = makeStyles(theme => ({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  },
  container: {
    minHeight: 600
    //maxheight: 300
  },
  childGrid: {
    padding: theme.spacing(2)
  },
  text: {
    color: '#d7d7d7',
    fontSize: 25,
    textAlign: 'center',
    marginLeft: 20
  },
  labelText: {
    fontSize: 12
  },
  description: {
    marginTop: 25,
    color: '#dad9e1',
    fontSize: 25,
    marginBottom: 40
  },
  icon: {
    paddingTop: 5,
    color: '#fff'
  },
  buttonGroup: {
    height: 70,
    border: '2px solid #7868CA',
    marginBottom: 50
  },
  button: {
    border: '2px solid transparent',
    fontSize: 16,
    color: '#8E8CA7'
  },
  buttons: {
    fontSize: 16,
    color: '#8E8CA7',
    backgroundColor: '#7868CA',
    '&:hover': {
      backgroundColor: '#7868CA'
    }
  }
}));

const caller = [
  'Direct Contact',
  'Third-Party',
  'Health-Facility',
  'Other states',
  'Port of Entry',
  'LASHMA'
];

const CreatePatient = () => {
  const [selected, setSelected] = useState('');
  const [formState, setFormState] = useState({});

  // console.log(formState)

  const setFormInitialState = (value) => {

    setFormState({...formState, ...value})
  }

  const classes = useStyles();

  return (
    <Fragment>
      <Grid
        container
        spacing={2}
        direction="column"
        className={classes.container}>
        <Header classes={classes} text={'Register New Patient'} />
        <Grid container xs={12} className={classes.childGrid} justify="center">
          <Grid
            container
            xs={7}
            md={7}
            direction="column"
            justify="center"
            alignItems="center">
            <Grid>
              <Grid container direction="column">
                <ContactStatus
                  classes={classes}
                  caller={caller}
                  selected={selected}
                  setSelected={setSelected}
                />
                <PerfectScrollbar style={{height: '80vh'}}>
                  {QUESTIONS.map(item => {
                    return (
                      <Grid key={item.title}>
                        <Typography className={classes.description}>
                          {item.title}
                        </Typography>
                        <Grid container alignItems="center">
                          {item.content.map((formElements, index) => {
                            return (
                              <FormBuilder
                                key={index}
                                formInput={formElements}
                                setFormState={setFormInitialState}
                                formState={formState}
                              />
                            );
                          })}
                        </Grid>
                      </Grid>
                    );
                  })}
                </PerfectScrollbar>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CreatePatient;
