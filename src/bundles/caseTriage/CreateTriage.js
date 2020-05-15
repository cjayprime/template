import React, { Fragment, useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import {
  Grid,
  Stepper,
  Step,
  Typography,
  IconButton,
  ButtonBase,
  Radio,
  makeStyles
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import StepLabel from '@material-ui/core/StepLabel';
import { connect } from 'react-redux';
import Arrow from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import StepConnector from '@material-ui/core/StepConnector';
import { setShowFooter, setDispatchFunction } from 'reducers/ThemeOptions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Question from './components/question';
import TriageImage from 'images/triage.png';
import triageInfo from 'images/triageinfo.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Mutations
import createTriageMutation from 'bundles/patient/hoc/createTriageAnswers';

// Assets
import { triageQuestions, triageQuestionWeights } from './triageQuestions.js';

const compose = require('lodash')?.flowRight;

const QontoConnector = withStyles({
  alternativeLabel: {
    //top: 10,
    //left: 'calc(-50% + 16px)',
    // right: 'calc(50% + 16px)'
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
    color: '#8EE2E5'
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
  },
  green: {
    backgroundColor: '#28BAC0'
  }
});

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
      '0 6px 16px rgba(39, 186, 192, 0.20), 0 2px 10px rgba(39, 186, 192, 0.10)',
    '&:hover': {
      backgroundColor: '#27BAC0'
    }
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
  },
  resultText: {
    color: '#fff',
    fontSize: 16
  },
  noRiskResult: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
  centerText: {
    textAlign: 'center'
  },
  roundedButton: {
    borderRadius: 50,
    backgroundColor: '#28BAC0',
    '&:hover': {
      backgroundColor: '#28BAC0'
    }
  },
  roundedButtonBack: {
    borderRadius: 50,
    marginRight: 30,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgb(113, 106, 158)'
    }
  },
  endIcon: {
    marginRight: 20,
    marginBottom: 5
  },
  roundedIcon: {
    fontSize: 15,
    color: '#fff'
  }
}));

function getStepContent(step) {
  const questionCategory = steps[step];

  if (questionCategory === 'Result') {
    return 'result';
  }

  return triageQuestions[questionCategory];
}

const ResultContainer = ({ classes, triageScore = 0 }) => {
  let riskLevel = 'no risk';
  let message =
    'Advise patient to self medicate and observe signs and symptoms';

  // set the message accordingly based on the score
  if (triageScore >= 5 && triageScore <= 9) {
    message =
      'Advice patient to hydrate properly, use over the counter medication, maintain good hygiene. Observe and re-evaluate after 2 days';
  } else if (triageScore >= 10 && triageScore <= 39) {
    riskLevel = 'High Risk';
    message =
      'The Evacuation & Decon has been notified of this case. Please transfer the call to the Evacuation & Decon team and close call log.';
  }

  return (
    <Grid
      container
      spacing={8}
      alignItems="center"
      direction="column"
      justify="center">
      <Grid item xs={4} md={4} style={{ marginTop: 100 }}>
        <img src={TriageImage} />
      </Grid>
      <Grid item xs={5} md={5} style={{ textAlign: 'center' }}>
        <Typography
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 25,
            textTransform: 'capitalize'
          }}>
          {riskLevel}
        </Typography>
        <Typography style={{ color: '#fff', fontSize: 20 }}>
          {' '}
          The patient has been classified as {riskLevel}
        </Typography>
      </Grid>
      <Grid item xs={5} md={5} style={{ textAlign: 'center' }}>
        <img src={triageInfo} />
        <Typography style={{ color: '#fff', fontSize: 20 }}>
          {' '}
          {message}
        </Typography>
      </Grid>
      <Grid item md={5} xs={5}>
        <ButtonBase
          variant="contained"
          to="/Patient"
          component={Link}
          color="primary"
          classes={{ root: classes.nextButton }}>
          Close the Case
        </ButtonBase>
      </Grid>
    </Grid>
  );
};

export const CreateTriage = ({
  createTriage,
  showFooter,
  setDispatchFunc,
  canEdit,
  triageAnswers
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed] = useState({});
  const [answers, setAnswers] = useState({});
  const [triageAnswerResult, setTriageAnswerResult] = useState({});
  const [triageScore, setTriageScore] = useState(0);
  const questionCategory = steps;
  const classes = useStyles();

  useEffect(() => {
    if (!canEdit && triageAnswers) {
      setAnswers(triageAnswers);
    }
  }, [canEdit, triageAnswers]);

  useEffect(() => {
    showFooter(true);
  }, [showFooter]);

  const QontoStepIcon = props => {
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
              colorPrimary: classes.radio,
              root: classes.green
            }}
          />
        )}
      </div>
    );
  };

  const totalSteps = () => {
    return questionCategory.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = useCallback(() => {
    return activeStep === totalSteps() - 1;
  });

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

    // get the question weight
    const questionWeight = triageQuestionWeights[questionKey];

    // set the value of the question based on the weight and the answer
    if (questionWeight) {
      setTriageAnswerResult({
        ...triageAnswerResult,
        [questionKey]: questionWeight * (answer.toLowerCase() === 'yes' ? 1 : 0)
      });
    }
  };

  // calculate the triage score
  useEffect(() => {
    if (isLastStep()) {
      const score = Reflect.ownKeys(triageAnswerResult).reduce((agg, curr) => {
        agg += parseInt(triageAnswerResult[curr], 10);
        return agg;
      }, 0);

      setTriageScore(score);
    }
  }, [activeStep, triageScore, triageAnswerResult, isLastStep]);

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
                  completed={completed[index]}
                  StepIconComponent={QontoStepIcon}
                  disabled={label === 'Result'}
                  onClick={handleStep(index)}>
                  <Typography
                    style={{
                      color: completed[index] ? '#8EE2E5' : '#8EE2E5',
                      fontWeight: 'bold'
                    }}>
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item md={8} lg={9} style={{ padding: 33, overflowX: 'hidden' }}>
          <Fragment>
            {steps[activeStep] === 'Result' ? (
              <ResultContainer classes={classes} triageScore={triageScore} />
            ) : (
              <div>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={6} style={{ marginBottom: 20 }}>
                      <Grid container direction="column">
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
                    </Grid>
                    <Grid item xs={6}>
                      <Grid
                        container
                        justify="flex-end"
                        alignItems="flex-end"
                        className="p-4">
                        <Fragment>
                          <IconButton
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.roundedButtonBack}>
                            <ArrowLeft className={classes.roundedIcon} />
                          </IconButton>
                        </Fragment>
                        <Fragment>
                          <IconButton
                            onClick={handleNext}
                            className={classes.roundedButton}>
                            <Arrow className={classes.roundedIcon} />
                          </IconButton>
                        </Fragment>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <PerfectScrollbar
                  options={{ suppressScrollX: true }}
                  style={{
                    borderRight: '4px solid #716A9E',
                    height: '70vh',
                    paddingRight: 10
                  }}>
                  <div>
                    {getStepContent(activeStep).map(questions => (
                      <div>
                        <Question
                          {...questions}
                          onAnswer={handleInputChange}
                          answer={answers[questions.questionKey]}
                          canEdit={canEdit}
                        />
                        {questions.children &&
                        questions.children.length > 0 &&
                        answers[questions.questionKey] ===
                          questions.displayChildrenOn ? (
                          <Fragment>
                            {questions.children.map(childQuestion => (
                              <Fragment key={childQuestion.questionKey}>
                                <Question
                                  canEdit={canEdit}
                                  {...childQuestion}
                                  isChild={true}
                                  onAnswer={handleInputChange}
                                  answer={answers[childQuestion.questionKey]}
                                />
                              </Fragment>
                            ))}
                          </Fragment>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </PerfectScrollbar>
              </div>
            )}
          </Fragment>
          {/* <Box
        display="flex"
      //  className={'app-footer text-black-50 app-footer---fixed'}
        style={{ padding: 10 }}
        flexDirection="row-reverse"
        >
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
      </Box> */}
        </Grid>
      </Grid>
    </Fragment>
  );
};

CreateTriage.propTypes = {
  createTriage: PropTypes.func,
  showFooter: PropTypes.func,
  setDispatchFunc: PropTypes.func,
  canEdit: PropTypes.bool
};

CreateTriage.defaultProps = {
  createTriage: () => {},
  showFooter: () => {},
  setDispatchFunc: () => {},
  canEdit: true
};

const mapDispatchToProps = dispatch => ({
  showFooter: value => dispatch(setShowFooter(value)),
  setDispatchFunc: value => dispatch(setDispatchFunction(value))
});

export default compose(
  connect(null, mapDispatchToProps),
  createTriageMutation
)(CreateTriage);
