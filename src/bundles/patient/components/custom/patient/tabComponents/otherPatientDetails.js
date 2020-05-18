import React, { Fragment, useState, useEffect } from 'react';
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
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import EventAvailable from '@material-ui/icons/EventAvailable';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';

import { DefaultCheckbox } from 'bundles/patient/components/custom/formBuilder';

const useStyles = makeStyles(theme => ({
  regLabelText: {
    fontSize: 15,
    color: '#231E1E'
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
    color: '#EFA14B',
    lineHeight: 1.5,
    fontSize: 16,
    padding: '10px 50px 10px'
  },
  formButtonTS: {
    color: '#FFF',
    backgroundColor: '#CB6A00',
    boxShadow:
      '0 6px 16px rgba(239, 161, 75, 0.20), 0 2px 10px rgba(239, 161, 75, 0.10)',
    '&:hover': {
      backgroundColor: '#CB6A00',
      border: 'none'
    },
    '&:active': {
      backgroundColor: '#CB6A00',
      border: 'none'
    }
  },
  input: {
    fontSize: 13,

    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`
    },
    backgroundColor: '#E9E8E8',
    color: '#8F8D8C'
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
    color: '#231E1E'
  },
  radio: {
    color: '#CACACA'
  },
  radioChecked: {
    color: '#6EA915 !important'
  },
}));

const dateInputTheme = createMuiTheme({
  overrides: {
    MuiFilledInput: {
      root: {
        backgroundColor: '#E9E8E8',
        color: '#8F8D8C',
        borderRadius: '8px !important',
        border: '2px solid transparent',
        '&:hover': {
          backgroundColor: '#E9E8E8'
        },
        '&$focused': {
          borderColor: '#8F8D8C',
          backgroundColor: '#E9E8E8'
        }
      },
      underline: {
        backgroundColor: '#E9E8E8',
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

const radioOptionButton = (
  label,
  classes,
  questionKey,
  onValueChange,
  value
) => {
  return (
    <Fragment>
      <Typography classes={{ root: classes.LabelText }}>{label}</Typography>
      <div>
        <RadioGroup
          style={{ display: 'flex', flexDirection: 'row' }}
          value={value}
          onChange={ev => onValueChange(questionKey, ev.target.value)}
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
                    colorPrimary: classes.radio,
                    checked: classes.radioChecked
                  }}
                />
              }
              label={option}
              style={{color: '#231E1E'}}
            />
          ))}
          {/* </Grid> */}
        </RadioGroup>
      </div>
    </Fragment>
  );
};

export const OtherPatientDetails = ({ deceasedPatient, markPatientAsDead }) => {
  const classes = useStyles();
  const [displayForm, setDisplayForm] = useState(false);
  const [deathReport, setDeathReport] = useState({});
  let [disableFields, setDisableFields] = useState(false);

  useEffect(() => {
    if (deceasedPatient && deceasedPatient.id) {
      setDisplayForm(true);
      setDeathReport(deceasedPatient);
      setDisableFields(true);
    }
  }, [deceasedPatient]);

  const onPatientDeathStatusChange = () => {
    setDisplayForm(!displayForm);
  };

  const onReportValueChange = (questionName, answerValue) => {
    setDeathReport({
      ...deathReport,
      [questionName]: answerValue
    });
  };

  const setPatientDeathData = async () => {
    try {
      await markPatientAsDead(deathReport);
      console.log(deceasedPatient, 'deceasedPatient');
      // setDisableFields(true);
    } catch (err) {
      // do something with the error
    }
  };

  const dateOfDeath = deathReport.dateOfDeath ? deathReport.dateOfDeath : null;

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <FormControlLabel
            disabled={disableFields}
            onChange={onPatientDeathStatusChange}
            checked={displayForm}
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
      {displayForm && (
        <Fragment>
          <Grid container style={{ marginTop: 24 }}>
            <Grid item xs={4}>
              <Typography classes={{ root: classes.LabelText }}>
                Date & Time of death
              </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={dateInputTheme}>
                  <KeyboardDateTimePicker
                    variant="inline"
                    inputVariant="filled"
                    margin="normal"
                    id="time-of-death"
                    value={dateOfDeath}
                    onChange={date => onReportValueChange('dateOfDeath', date)}
                    fullWidth
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
                  value={deathReport.locationOfDeath || ''}
                  onChange={ev =>
                    onReportValueChange('locationOfDeath', ev.target.value)
                  }
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
              {radioOptionButton(
                'Response to Stimuli',
                classes,
                'responseToStimuli',
                onReportValueChange,
                deathReport.responseToStimuli
              )}
            </Grid>
            <Grid item xs={4}>
              {radioOptionButton(
                'Spontaneous respiration',
                classes,
                'spontaneousRespiration',
                onReportValueChange,
                deathReport.spontaneousRespiration
              )}
            </Grid>
            <Grid item xs={4}>
              {radioOptionButton(
                'Auscultatory breath sounds',
                classes,
                'auscultatoryBreathSounds',
                onReportValueChange,
                deathReport.auscultatoryBreathSounds
              )}
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 16 }}>
            <Grid item xs={4}>
              {radioOptionButton(
                'Peripheral pulses',
                classes,
                'peripheralPulses',
                onReportValueChange,
                deathReport.peripheralPulses
              )}
            </Grid>
            <Grid item xs={4}>
              {radioOptionButton(
                'Central pulses',
                classes,
                'centralPulses',
                onReportValueChange,
                deathReport.centralPulses
              )}
            </Grid>
            <Grid item xs={4}>
              {radioOptionButton(
                'Heart sounds',
                classes,
                'heartSounds',
                onReportValueChange,
                deathReport.heartSounds
              )}
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 16 }}>
            <Grid item xs={4}>
              {radioOptionButton(
                'Pupils',
                classes,
                'pupils',
                onReportValueChange,
                deathReport.pupils
              )}
            </Grid>
            <Grid item xs={4}>
              {radioOptionButton(
                'Corneal reflex',
                classes,
                'cornealReflex',
                onReportValueChange,
                deathReport.cornealReflex
              )}
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
                  value={deathReport.examinationFindings || ''}
                  onChange={ev =>
                    onReportValueChange('examinationFindings', ev.target.value)
                  }
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
                Interventions and outcome (including cardiopulmonary
                resuscitation CPR, defibrillation, medications)
              </Typography>
              <div>
                <OutlinedInput
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  value={deathReport.interventionAndOutcome || ''}
                  onChange={ev =>
                    onReportValueChange(
                      'interventionAndOutcome',
                      ev.target.value
                    )
                  }
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
                  value={deathReport.causeOfDeath || ''}
                  onChange={ev =>
                    onReportValueChange('causeOfDeath', ev.target.value)
                  }
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
              {radioOptionButton(
                'Family notified',
                classes,
                'familyNotified',
                onReportValueChange,
                deathReport.familyNotified
              )}
            </Grid>
            <Grid item xs={4}>
              {radioOptionButton(
                'Autopsy',
                classes,
                'autopsy',
                onReportValueChange,
                deathReport.autopsy
              )}
            </Grid>
            <Grid item xs={4}>
              {radioOptionButton(
                'Organ donor',
                classes,
                'organDonor',
                onReportValueChange,
                deathReport.organDonor
              )}
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 16 }}>
            <Grid item xs={12}>
              <Typography classes={{ root: classes.LabelText }}>
                Plan
              </Typography>
              <div>
                <OutlinedInput
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  value={deathReport.plan || ''}
                  onChange={ev => onReportValueChange('plan', ev.target.value)}
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
              disabled={disableFields}
              onClick={setPatientDeathData}
              disableElevation={false}
              className={classnames(classes.formButton, classes.formButtonTS)}>
              SAVE
            </Button>
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

OtherPatientDetails.propTypes = {
  deceasedPatient: PropTypes.object,
  markPatientAsDead: PropTypes.func
};

OtherPatientDetails.defaultProps = {
  deceasedPatient: {},
  markPatientAsDead: () => {}
};
