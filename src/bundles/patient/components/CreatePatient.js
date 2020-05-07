import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Grid, Typography, FormControlLabel, Button } from '@material-ui/core';
import ContactStatus from './custom/contactStatus';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FormBuilder from 'bundles/patient/components/custom/formBuilder';
import createPatientHoc from 'bundles/patient/hoc/createPatient';
import createQueueHoc from 'bundles/queue/hoc/createQueue';
import { DefaultCheckbox } from 'bundles/patient/components/custom/formBuilder';
import { useStyles } from 'bundles/patient/components/custom/patient/index.style';
import { QUESTIONS } from './custom/questions';
import Loader from 'bundles/shared/components/Loader';

const compose = require('lodash')?.flowRight;

const caller = [
  'Direct Contact',
  'Third-Party',
  'Health-Facility',
  'Other states',
  'Port of Entry',
  'LASHMA'
];

const CreatePatient = ({ createPatientPG, addQueue, history }) => {

  const [selected, setSelected] = useState('');
  const [formState, setFormState] = useState({});
  const [loading, setLoading] = useState(false);

  const registerPatient = async () => {
    const key = 'birthDate';
    const day = formState[`${key}-d`];
    const month = formState[`${key}-m`];
    const year = formState[`${key}-y`];

    const parseObject = { ...formState };
    delete parseObject[`${key}-d`];
    delete parseObject[`${key}-m`];
    delete parseObject[`${key}-y`];

    parseObject['birthDate'] = `${year}-${day}-${day}`; // fix birthdate
    parseObject['epidNumber'] = `${Math.floor(Math.random() * 999999)}`;
    const queueTeam = parseObject['queue'];

    delete parseObject['queue'];
    setLoading(true)
    const response = await createPatientPG({
      variables: {
        input: {
          patient: {
            ...parseObject
          }
        }
      }
    });

    if (!response) {
      // Error, do something
    }
    if (
      response.data &&
      response.data.createPatient &&
      response.data.createPatient.patient
    ) {
      const {
        data: {
          createPatient: {
            patient: { id, epidNumber }
          }
        }
      } = response;
      addToQueue(epidNumber, id, queueTeam);
    }
  };

  const addToQueue = async (patientEpidNumber, id, team) => {
    const response = await addQueue({
      variables: {
        input: {
          queue: {
            patientEpidNumber,
            patientId: id,
            team
          }
        }
      }
    });

    if (response) {
      setLoading(false)

      if(team == 'No queue') {
        history.push('/CreateTriage')
      } else {
        history.push('/Patient')
      }
    }
    
  };

  // useEffect(() => {
  //   if (Object.keys(formState).length > 5 && !isFooter) {
  //     showFooter(true);
  //     setFooter(true);
  //   }
  //   // setDispatchFunc(registerPatient); Previously had this function dispatching save to header
  // }, [formState, isFooter, registerPatient, setDispatchFunc, showFooter]);

  useEffect(() => {}, [selected]);

  const setFormInitialState = value => {
    setFormState({ ...formState, ...value });
  };

  const RegisterPatient = ({ classes, func }) => {
    return (
      <Grid container className={classes.regContainer} direction="row">
        <Grid item xs={6}>
          <FormControlLabel
            control={<DefaultCheckbox name="checkedC" />}
            label={
              <Typography className={classes.regLabelText}>
                {' '}
                Send Emmergency Number to caller{' '}
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Grid container style={{ paddingRight: 0 }} justify="flex-end">
            <Button onClick={() => func()} className={classes.regButtons}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const classes = useStyles();

  return (
    <Fragment>
      <Grid
        container
        spacing={2}
        direction="column"
        className={classes.container}>
        {/* <Header classes={classes} text={'Register New Patient'} /> */}
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
                <PerfectScrollbar style={{ height: '80vh', borderRight: '4px solid #716A9E', padding: 20}}>
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
                 { loading ?  <Loader/>  : <RegisterPatient classes={classes} func={registerPatient} /> }
                </PerfectScrollbar>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

// const mapDispatchToProps = dispatch => ({
//   showFooter: value => dispatch(setShowFooter(value)),
//   setDispatchFunc: value => dispatch(setDispatchFunction(value))
// });

export default withRouter(compose(
  createPatientHoc,
  createQueueHoc
)(CreatePatient));
