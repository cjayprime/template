import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Grid, Typography, FormControlLabel, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import ContactStatus from './custom/contactStatus';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FormBuilder from 'bundles/patient/components/custom/formBuilder';
import createPatientHoc from 'bundles/patient/hoc/createPatient';
import createQueueHoc from 'bundles/queue/hoc/createQueue';
import { saveCurrentPatient } from 'bundles/patient/actions'
import { DefaultCheckbox, capitalizeFirstWord } from 'bundles/patient/components/custom/formBuilder';
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

const CreatePatient = ({ createPatientPG, addQueue, history, savePatient }) => {

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [selected, setSelected] = useState('');
  const [formState, setFormState] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({open: false, message: '',  vertical: 'bottom', horizontal: 'left' })


  const registerPatient = async () => {
    let nonValidState = {}
    QUESTIONS.forEach((item) => {
      item.content.forEach((field) => {
        if((field.required && !formState[field.key]) || ( field.required && formState[field.key] && formState[field.key].length < 1)) {
          nonValidState[field.key] = ''
        }

      })
    })

    if(Object.keys(nonValidState).length > 0) {
      setSnackBar({...snackBar, message: 
        `Invalid form Input, Please Enter
        ${Object.keys(nonValidState).map((item) => capitalizeFirstWord(`${item} `)).join(',')}`, open: true, state: 'error'})
      setFormState({...formState, ...nonValidState})
      return
    }
    
  
    const parseObject = { ...formState };
    // parseObject['birthDate'] = `${year}-${day}-${day}`; // fix birthdate
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
      savePatient({...response.data.createPatient.patient});
      addToQueue(epidNumber, id, queueTeam);
    }
  };

  const addToQueue = async (patientEpidNumber, id, team) => {
   
      if(!team || team == 'No queue') {
        history.push('/CreateTriage')
      } else {
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
          setSnackBar({...snackBar, message: `${formState.firstname } ${formState.lastname} Was Successfully Created.`,
           open: true, state: 'success'})
         // history.push('/Patient')
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

  const handleSnackClose = () => {
    setSnackBar({...snackBar, message: '', open: false})
  }

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
        <Grid container item xs={12} className={classes.childGrid} justify="center">
          <Grid
            container
            item
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
      <Snackbar
        anchorOrigin={{ vertical: snackBar.vertical, horizontal: snackBar.horizontal }}
        key={`${snackBar.vertical},${snackBar.horizontal}`}
        open={snackBar.open}
        autoHideDuration={10000}
        onClose={handleSnackClose}     
      > 
        <Alert severity={snackBar.state || 'error'}>{snackBar.message}</Alert>
      </Snackbar>

    </Fragment>
  );
};

 const mapDispatchToProps = dispatch => ({
   savePatient: value => dispatch(saveCurrentPatient(value)),
 });

export default withRouter(compose(
  connect(null, mapDispatchToProps),
  createPatientHoc,
  createQueueHoc
)(CreatePatient));

