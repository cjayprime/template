import React, { Fragment, useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Grid,
  Stepper,
  Step,
  Typography,
  Button,
  Radio,
  Box,
  makeStyles,
  withStyles
} from '@material-ui/core';
import StepLabel from '@material-ui/core/StepLabel';
import { connect } from 'react-redux';
import StepConnector from '@material-ui/core/StepConnector';
import { setShowFooter, setDispatchFunction } from 'reducers/ThemeOptions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Question from './components/question';

// Mutations
import createTriageMutation from 'bundles/patient/hoc/createTriageAnswers';

// Assets
import triageQuestions from './questions.json';

const compose = require('lodash')?.flowRight;

const QontoConnector = withStyles({
  alternativeLabel: {
    //top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  active: {
    '& $line': {
      borderColor: '#8EE2E5'
    }
  },
  completed: {
    '& $line': {
      borderColor: '#8EE2E5',
      borderWidth: 5
    }
  },
  line: {
    padding: '0 0 8px',
    marginLeft: 6,
    //marginTop: 7,
    borderColor: '#716A9E',
    borderTopWidth: 3,
    borderWidth: 5,
    borderRadius: 1
  }
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center'
  },
  radio: {
    color: '#FFFFFF'
  },
  active: {
    color: '#784af4'
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}>
      {completed ? (
        <Radio
          color="primary"
          classes={{
            colorPrimary: classes.radio
          }}
        />
      ) : (
        <Radio
          color="primary"
          classes={{
            colorPrimary: classes.radio
          }}
        />
      )}
    </div>
  );
}

const steps = Reflect.ownKeys(triageQuestions);
steps.push('Result');

const useStyles = makeStyles(theme => ({
  nextButton: {
    backgroundColor: '#27BAC0',
    color: '#fff',
    width: 300,
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    marginRight: 120, //fix
    borderRadius: 50,
    textTransform: 'uppercase',
    boxShadow:
      '0 6px 16px rgba(39, 186, 192, 0.20), 0 2px 10px rgba(39, 186, 192, 0.10)'
  },
  backButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    width: 300,
    marginRight: 20,
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    borderRadius: 50,
    textTransform: 'uppercase',
    boxShadow: 'none'
  }
}));

function getStepContent(step) {
  const questionCategory = steps[step];

  if (questionCategory === 'Result') {
    return 'result';
  }

  return triageQuestions[questionCategory];
}

const CreateTriage = ({ createTriage, showFooter, setDispatchFunc }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed] = useState({});
  const [answers, setAnswers] = useState({});
  const questionCategory = steps;
  const classes = useStyles();

  useEffect(() => {
    showFooter(false);
  }, [showFooter]);

  const totalSteps = () => {
    return questionCategory.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? questionCategory.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };

  const handleInputChange = (questionKey, answer) => {
    setAnswers({
      ...answers,
      [questionKey]: answer
    });
  };

  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Stepper
            activeStep={activeStep}
            style={{ backgroundColor: 'transparent' }}
            connector={<QontoConnector />}
            orientation="vertical">
            {questionCategory.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={QontoStepIcon}
                  disabled={label === 'Result'}
                  onClick={handleStep(index)}
                  completed={completed[index]}>
                  <Typography
                    style={{
                      color: completed[index] ? '#8EE2E5' : '#716A9E',
                      fontWeight: 'bold'
                    }}>
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item md={9} lg={7} style={{ padding: 33 }}>
          <Fragment>
            {steps[activeStep] === 'Result' ? (
              'Oreofe'
            ) : (
              <div>
                  <Grid style={{ marginBottom: 20 }}>
                    <Typography
                      style={{
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: 18
                      }}>
                      {' '}
                      Please select all the statements that apply to you
                    </Typography>
                    <Typography style={{ color: '#716A9E', fontSize: 15 }}>
                      {' '}
                      Select one answer in each row
                    </Typography>
                  </Grid>
                  {getStepContent(activeStep).map(questions => (
                    <Fragment key={questions.questionKey}>
                      <Question
                        {...questions}
                        onAnswer={handleInputChange}
                        answer={answers[questions.questionKey]}
                      />
                      {questions.children &&
                      questions.children.length > 0 &&
                      answers[questions.questionKey] ===
                        questions.displayChildrenOn ? (
                        <Fragment>
                          {questions.children.map(childQuestion => (
                            <Fragment key={childQuestion.questionKey}>
                              <Question
                                {...childQuestion}
                                isChild={true}
                                onAnswer={handleInputChange}
                                answer={answers[childQuestion.questionKey]}
                              />
                            </Fragment>
                          ))}
                        </Fragment>
                      ) : null}
                    </Fragment>
                  ))}
              </div>
            )}
          </Fragment>
        </Grid>
      </Grid>
      <Box
        display="flex"
        className={'app-footer text-black-50 app-footer---fixed'}
        style={{ padding: 10 }}
        flexDirection="row-reverse">
        {!isLastStep() ? (
          <Button
            variant="contained"
            color="primary"
            classes={{ root: classes.nextButton }}
            onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            classes={{ root: classes.nextButton }}>
            Close the Case
          </Button>
        )}
        <Button
          disabled={activeStep === 0}
          classes={{
            root: classes.backButton,
            focusVisible: classes.BackButton
          }}
          onClick={handleBack}
          variant="contained">
          Back
        </Button>
      </Box>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  showFooter: value => dispatch(setShowFooter(value)),
  setDispatchFunc: value => dispatch(setDispatchFunction(value))
});

export default compose(
  connect(null, mapDispatchToProps),
  createTriageMutation
)(CreateTriage);
