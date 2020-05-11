import React, { Fragment, useState } from 'react';
import classnames from 'classnames';
import {
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Typography,
  OutlinedInput,
  createMuiTheme
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import EventAvailable from '@material-ui/icons/EventAvailable';
import DateFnsUtils from '@date-io/date-fns';

import { DefaultCheckbox } from 'bundles/patient/components/custom/formBuilder';

const useStyles = makeStyles(theme => ({
  regLabelText: {
    fontSize: 15,
    color: '#fff'
  },
  LabelText: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 9
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
  },
  input: {
    fontSize: 13,

    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`
    },
    backgroundColor: '#474562',
    color: '#fff'
  },
  inputFocused: {},
  inputNotch: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`
    },
    borderWidth: '1px',
    borderColor: 'transparent !important',
    color: 'white'
  },
  sectionHeader: {
    fontSize: 17,
    color: '#fff'
  },
  radio: {
    color: '#FFFFFF'
  }
}));

const dateInputTheme = createMuiTheme({
  overrides: {
    MuiFilledInput: {
      root: {
        backgroundColor: '#474562',
        color: '#fff',
        borderRadius: '8px !important',
        border: '2px solid transparent',
        '&:hover': {
          backgroundColor: '#474562'
        },
        '&$focused': {
          borderColor: '#fff',
          backgroundColor: '#474562'
        }
      },
      underline: {
        backgroundColor: '#474562',
        '&:before, &:after': {
          display: 'none'
        }
      },
      adornedEnd: {
        paddingRight: 5
      },
      input: {
        paddingTop: 18.5,
        paddingBottom: 18.5,
        borderRadius: 8,
        height: 16.625,
        lineHeight: 1
      }
    },
    MuiFormControl: {
      root: {
        border: 0
      },
      marginNormal: {
        margin: '0 !important'
      }
    }
  }
});

const radioOptionButton = (label, classes) => {
  return (
    <Fragment>
      <Typography classes={{ root: classes.LabelText }}>{label}</Typography>
      <div>
        <RadioGroup
          style={{ display: 'flex', flexDirection: 'row' }}
          name="stimuli">
          {/* <Grid container justify="space-between"> */}
          {['yes', 'no'].map(option => (
            <FormControlLabel
              key={`stimuli-${option}`}
              value={option}
              control={
                <Radio
                  color="primary"
                  classes={{
                    colorPrimary: classes.radio
                  }}
                />
              }
              label={option}
              classes={{
                root: classes.radio
              }}
            />
          ))}
          {/* </Grid> */}
        </RadioGroup>
      </div>
    </Fragment>
  );
};

export const OtherPatientDetails = ({ patient }) => {
  const classes = useStyles();
  const selectedDate = new Date();
  const [displayForm, setDisplayForm] = useState(false);

  const onValueChange = event => {
    setDisplayForm(event.target.value);
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <FormControlLabel
            onChange={onValueChange}
            control={<DefaultCheckbox name="markPatientAsDead" />}
            value={displayForm}
            label={
              <Typography classes={{ root: classes.regLabelText }}>
                {' '}
                Mark this patient as dead.
              </Typography>
            }
          />
        </Grid>
      </Grid>
      <Fragment>
        <Grid container style={{ marginTop: 24 }}>
          <Grid item xs={4}>
            <Typography classes={{ root: classes.LabelText }}>
              Date & Time of death
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={dateInputTheme}>
                <KeyboardDatePicker
                  variant="inline"
                  inputVariant="filled"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="time-of-death"
                  value={selectedDate}
                  fullWidth
                  views={['year', 'date', '']}
                  keyboardIcon={<EventAvailable style={{ color: '#fff' }} />}
                  animateYearScrolling
                  autoOk
                  maxDate={new Date()}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 24 }}>
          <Grid item xs={4}>
            <Typography classes={{ root: classes.LabelText }}>
              Location of death
            </Typography>
            <div>
              <OutlinedInput
                fullWidth
                variant="outlined"
                classes={{
                  root: classes.input,
                  focused: classes.inputFocused,
                  notchedOutline: classes.inputNotch
                }}
              />
            </div>
          </Grid>
        </Grid>
        <div
          style={{
            margin: '36px 0',
            borderBottom: '#BDB8D9 1px solid',
            height: 1,
            width: '100%'
          }}></div>
        <Grid container>
          <Grid item xs={12}>
            <Typography classes={{ root: classes.sectionHeader }}>
              Physical Examination
            </Typography>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 16 }}>
          <Grid item xs={4}>
            {radioOptionButton('Response to Stimuli', classes)}
          </Grid>
          <Grid item xs={4}>
            {radioOptionButton('Spontaneous respiration', classes)}
          </Grid>
          <Grid item xs={4}>
            {radioOptionButton('Auscultatory breath sounds', classes)}
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 16 }}>
          <Grid item xs={4}>
            {radioOptionButton('Peripheral pulses', classes)}
          </Grid>
          <Grid item xs={4}>
            {radioOptionButton('Central pulses', classes)}
          </Grid>
          <Grid item xs={4}>
            {radioOptionButton('Heart sounds', classes)}
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 16 }}>
          <Grid item xs={4}>
            {radioOptionButton('Pupils', classes)}
          </Grid>
          <Grid item xs={4}>
            {radioOptionButton('Corneal reflex', classes)}
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Grid container style={{ marginTop: 16 }}>
          <Grid item xs={12}>
            <Typography classes={{ root: classes.LabelText }}>
              Brief description of examination findings
            </Typography>
            <div>
              <OutlinedInput
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                classes={{
                  root: classes.input,
                  focused: classes.inputFocused,
                  notchedOutline: classes.inputNotch
                }}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 16 }}>
          <Grid item xs={12}>
            <Typography classes={{ root: classes.LabelText }}>
              Interventions and outcome (including cardiopulmonary resuscitation
              CPR, defibrillation, medications)
            </Typography>
            <div>
              <OutlinedInput
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                classes={{
                  root: classes.input,
                  focused: classes.inputFocused,
                  notchedOutline: classes.inputNotch
                }}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 16 }}>
          <Grid item xs={12}>
            <Typography classes={{ root: classes.LabelText }}>
              Diagnosis/cause of death
            </Typography>
            <div>
              <OutlinedInput
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                classes={{
                  root: classes.input,
                  focused: classes.inputFocused,
                  notchedOutline: classes.inputNotch
                }}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 16 }}>
          <Grid item xs={4}>
            {radioOptionButton('Family notified', classes)}
          </Grid>
          <Grid item xs={4}>
            {radioOptionButton('Autopsy', classes)}
          </Grid>
          <Grid item xs={4}>
            {radioOptionButton('Organ donor', classes)}
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 16 }}>
          <Grid item xs={12}>
            <Typography classes={{ root: classes.LabelText }}>Plan</Typography>
            <div>
              <OutlinedInput
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                classes={{
                  root: classes.input,
                  focused: classes.inputFocused,
                  notchedOutline: classes.inputNotch
                }}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 16 }} justify="flex-end">
          <Button className={classes.formButton}>CANCEL</Button>
          <Button
            disableElevation={false}
            className={classnames(classes.formButton, classes.formButtonTS)}>
            SAVE
          </Button>
        </Grid>
      </Fragment>
    </Fragment>
  );
};
