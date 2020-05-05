import React, { Fragment, useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Header from './custom/header';
import ContactStatus from './custom/contactStatus';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FormBuilder from './custom/formBuilder';
import createPatientHoc from 'bundles/patient/hoc/createPatient';
import { setShowFooter, setDispatchFunction } from 'reducers/ThemeOptions';
import { connect } from 'react-redux';
import { useStyles } from 'bundles/patient/components/custom/patient/index.style';
import { QUESTIONS } from './custom/questions';
const compose = require('lodash')?.flowRight;

const caller = [
  'Direct Contact',
  'Third-Party',
  'Health-Facility',
  'Other states',
  'Port of Entry',
  'LASHMA'
];

const CreatePatient = ({ showFooter, setDispatchFunc, createPatientPG }) => {
  const [selected, setSelected] = useState('');
  const [formState, setFormState] = useState({});
  const [isFooter, setFooter] = useState(false);

  const registerPatient = async () => {
    const key = 'birthDate';
    const day = formState[`${key}-d`];
    const month = formState[`${key}-m`];
    const year = formState[`${key}-y`];

    const parseObject = { ...formState };
    delete parseObject[`${key}-d`];
    delete parseObject[`${key}-m`];
    delete parseObject[`${key}-y`];

    parseObject['birthDate'] = `${year}-${day}-${month}`;
    parseObject['epidNumber'] = `${Math.floor(Math.random() * 999999)}`;

    console.log('State Passed is ', parseObject);

    const response = await createPatientPG({
      variables: {
        input: {
          patient : {
            ...parseObject
          }
        }
      }
    });
    console.log(response, '------>');
    // setFormState({})
  };

  useEffect(() => {
    if (Object.keys(formState).length > 5 && !isFooter) {
      showFooter(true);
      setFooter(true);
    }
    setDispatchFunc(registerPatient);
  }, [formState, isFooter, registerPatient, setDispatchFunc, showFooter]);

  useEffect(() => {}, [selected]);

  const setFormInitialState = value => {
    setFormState({ ...formState, ...value });
  };

  const classes = useStyles();

  return (
    <Fragment>
      <Grid
        container
        spacing={2}
        direction="column"
        className={classes.container}>
         { /* <Header classes={classes} text={'Register New Patient'} /> */}
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
                <PerfectScrollbar style={{ height: '80vh' }}>
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

const mapDispatchToProps = dispatch => ({
  showFooter: value => dispatch(setShowFooter(value)),
  setDispatchFunc: value => dispatch(setDispatchFunction(value))
});

export default compose(
  connect(null, mapDispatchToProps),
  createPatientHoc
)(CreatePatient);
