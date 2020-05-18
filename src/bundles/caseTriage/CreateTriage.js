import React, { Fragment, useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import {
  Grid,
  Stepper,
  Step,
  Typography,
  IconButton,
  Button,
  Box,
  ButtonBase,
  makeStyles
} from '@material-ui/core';
import { EVAC_AND_DECON, HIGH, MEDIUM, LOW, EPID_SURVEILLANCE } from 'bundles/queue/utilities/stateTransition';
import { withStyles } from '@material-ui/styles';
import StepLabel from '@material-ui/core/StepLabel';
import { connect } from 'react-redux';
import Arrow from '@material-ui/icons/ChevronRight';
import { searchFilter } from 'bundles/patient/selectors';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import StepConnector from '@material-ui/core/StepConnector';
import { setShowFooter, setDispatchFunction } from 'reducers/ThemeOptions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Question from './components/question';
import TriageImage from 'images/triage.png';
import triageInfo from 'images/triageinfo.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
// Mutations
import createTriageMutation from 'bundles/patient/hoc/createTriageAnswers';
import createPatientCaseTriage from 'bundles/patient/hoc/createPatientCase';
import sendSMS from 'bundles/sms/hoc/sendSms'
import createQueueHoc from 'bundles/queue/hoc/createQueue';

// Assets
import { triageQuestions, triageQuestionWeights } from './triageQuestions.js';

const compose = require('lodash')?.flowRight;

const QontoConnector = withStyles({
  alternativeLabel: {},
  active: {
    '& $line': {
      borderColor: '#EFA14B'
    }
  },
  completed: {
    '& $line': {
      borderColor: '#EFA14B'
    }
  },
  line: {
    borderColor: '#CACACA',
    borderWidth: 3,
    borderRadius: 1,
    marginLeft: 0
  },
  vertical: {
    marginLeft: 6,
    padding: 0
  },
  lineVertical: {
    minHeight: 36
  }
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    height: 15,
    width: 15,
    borderRadius: '50%',
    backgroundColor: '#CACACA',
    cursor: 'pointer',
    position: 'relative'
  },
  active: {
    backgroundColor: '#BF6E27',
    '&:after': {
      content: '""',
      width: 25,
      height: 25,
      border: '2px solid #EFA14B',
      display: 'block',
      borderRadius: '50%',
      position: 'absolute',
      left: -5,
      top: -5
    }
  },
  completed: {
    backgroundColor: '#EFA14B',
    zIndex: 1,
    fontSize: 18
  }
});

const steps = Reflect.ownKeys(triageQuestions);
steps.push('Result');

const useStyles = makeStyles(theme => ({
  nextButton: {
    backgroundColor: '#BF6E27',
    color: '#fff',
    width: 300,
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    marginRight: 120, //fix
    borderRadius: 50,
    textTransform: 'uppercase',
    boxShadow:
      '0 6px 16px rgba(190, 110, 39, 0.20), 0 2px 10px rgba(39, 186, 192, 0.10)',
    '&:hover': {
      backgroundColor: '#BF6E27'
    }
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
    backgroundColor: '#BF6E27',
    '&:hover': {
      backgroundColor: '#BF6E27'
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
  },
  stepLabel: {
    color: '#685E5E',
    fontWeight: 500,
    cursor: 'pointer',
    fontSize: 16
  },
  stepLabelActive: {
    '&.MuiStepLabel-label.MuiStepLabel-active': {
      color: '#EFA14B',
      fontWeight: 500
    }
  },
  stepLabelCompleted: {
    '&.MuiStepLabel-label.MuiStepLabel-completed': {
      color: '#EFA14B',
      fontWeight: 500
    }
  }
}));

function getStepContent(step) {
  const questionCategory = steps[step];

  if (questionCategory === 'Result') {
    return 'result';
  }

  return triageQuestions[questionCategory];
}

const ResultContainer = ({ classes, triageScore = 0, canEdit }) => {
  let riskLevel = 'no risk';
  let message =
    'Advise patient to self medicate and observe signs and symptoms';

  // set the message accordingly based on the score
  if (triageScore >= 5 && triageScore <= 9) {
    message =
      'Advice patient to hydrate properly, use over the counter medication, maintain good hygiene. Observe and re-evaluate after 2 days';
      riskLevel = 'Medium Risk';
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
            color: '#231E1E',
            fontWeight: 'bold',
            fontSize: 25,
            textTransform: 'capitalize'
          }}>
          {riskLevel}
        </Typography>
        <Typography style={{ color: '#231E1E', fontSize: 20 }}>
          {' '}
          The patient has been classified as {riskLevel}
        </Typography>
      </Grid>
      {canEdit && (
        <>
          <Grid item xs={5} md={5} style={{ textAlign: 'center' }}>
            {/* <img src={triageInfo} /> */}
            <Icon className="fas fa-exclamation-circle" style={{color: '#E4A35B', fontSize: 36}} />
            <Typography style={{ color: '#231E1E', fontSize: 20 }}>
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
        </>
      )}
    </Grid>
  );
};

export const CreateTriage = ({
  createTriage,
  showFooter,
  setDispatchFunc,
  canEdit,
  triageAnswers,
  currentPatient,
  addQueue,
  createPatientCase,
  sendSms
}) => 
{
  const [activeStep, setActiveStep] = useState(0);
  const [completed] = useState({});
  const [answers, setAnswers] = useState({});
  const [triageAnswerResult, setTriageAnswerResult] = useState({});
  const [triageScore, setTriageScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(false)
  const questionCategory = steps;
  const classes = useStyles();
 

  // Set state to the answers pssed if canEdit is false
  // Also calculate risk score from the answers passed
  useEffect(() => {
    if (!canEdit && triageAnswers) {
      setAnswers(triageAnswers);

      const triageScore = Reflect.ownKeys(triageQuestionWeights).reduce(
        (agg, question) => {
          const answerValue =
            triageAnswers[question].toLowerCase() === 'yes' ? 1 : 0;
          agg += triageQuestionWeights[question] * answerValue;
          return agg;
        },
        0
      );
      setTriageScore(triageScore);
    }
  }, [canEdit, triageAnswers]);

  useEffect(() => {
    showFooter(true);
  }, [showFooter]);

  const addPatienCase = async (id, riskLevel) => {
    const response = await createPatientCase({
      variables: {
        input: {
          patientCase: {
            patientId: id,
            riskLevel,
            submittedBy: 1
          }
        }
      }
    });

    if (response) return true;
    else return false;
  };

  const addTriage = async (id, answers) => {
    const response = await createTriage({
      variables: {
        input: {
          triageAnswer: {

            triageQuestionId: 1,
            patientId: id,
            answers
          }
        }
      }
    });

    if (response) return true;

    return false;
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

    if (response) return true;
    else return false;
  };

  const parseRiskLevel = async riskLevel => {
    if (!currentPatient?.id) return null


    if (riskLevel == HIGH) {

      const patientCase = await addPatienCase(currentPatient.id, HIGH);

      if (patientCase) {
        const queue = await addToQueue(
          currentPatient.epidNumber,
          currentPatient.id,
          EVAC_AND_DECON
        );

        if (queue) {
          const triage = await addTriage(currentPatient.id, JSON.stringify(answers)) 
        }
      } 

      return;
    } 

    if (riskLevel == MEDIUM) { 
      const patientCase = await addPatienCase(currentPatient.id, MEDIUM);

      if (patientCase) {
        const queue = await addToQueue(
          currentPatient.epidNumber,
          currentPatient.id,
          EPID_SURVEILLANCE
        );

        if (queue) {
          const triage = await addTriage(currentPatient.id, JSON.stringify(answers)) 
        }
      } 
      return;
    }
    

    // const response = await sendSms({
    //   variables: {
    //     input: {
    //         name: 'John Doe',
    //         phoneNumber: currentPatient.phoneNumber,
    //         message: ''
    //     }
    //   }
    // });

  
    // send sms
  }; 

  // const ResultContainer = ({ classes, triageScore = 0 }) => {
  //   let riskLevel = 'no risk';
  //   let message =
  //     'Advise patient to self medicate and observe signs and symptoms';

  //   // set the message accordingly based on the score
  //   if (triageScore >= 5 && triageScore <= 9) {
  //     message =
  //       'Advice patient to hydrate properly, use over the counter medication, maintain good hygiene. Observe and re-evaluate after 2 days';
  //     riskLevel = 'Medium Risk';
  //   } else if (triageScore >= 10 && triageScore <= 39) {
  //     riskLevel = 'High Risk';
  //     message =
  //       'The Evacuation & Decon has been notified of this case. Please transfer the call to the Evacuation & Decon team and close call log.';
  //   }
  
  //   return (
  //     <Grid
  //       container
  //       spacing={8}
  //       alignItems="center"
  //       direction="column"
  //       justify="center">
  //       <Grid item xs={4} md={4} style={{ marginTop: 100 }}>
  //         <img src={TriageImage} />
  //       </Grid>
  //       <Grid item xs={5} md={5} style={{ textAlign: 'center' }}>
  //         <Typography
  //           style={{
  //             color: '#fff',
  //             fontWeight: 'bold',
  //             fontSize: 25,
  //             textTransform: 'capitalize'
  //           }}>
  //           {riskLevel}
  //         </Typography>
  //         <Typography style={{ color: '#fff', fontSize: 20 }}>
  //           {' '}
  //           The patient has been classified as {riskLevel}
  //         </Typography>
  //       </Grid>
  //       <Grid item xs={5} md={5} style={{ textAlign: 'center' }}>
  //         <img src={triageInfo} />
  //         <Typography style={{ color: '#fff', fontSize: 20 }}>
  //           {' '}
  //           {message}
  //         </Typography>
  //       </Grid>
  //       <Grid item md={5} xs={5}>
  //         <ButtonBase
  //           variant="contained"
  //           to="/Patient"
  //           component={Link}
  //           color="primary"
  //           classes={{ root: classes.nextButton }}>
  //           Close the Case
  //         </ButtonBase>
  //       </Grid>
  //     </Grid>
  //   );
  // };

  const QontoStepIcon = props => {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed
        })}></div>
    );
  };

  const totalSteps = useCallback(() => {
    return questionCategory.length;
  }, [questionCategory]);

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = useCallback(() => {
    return activeStep === totalSteps() - 1;
  }, [activeStep, totalSteps]);

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
    if (isLastStep() && canEdit) {
      const score = Reflect.ownKeys(triageAnswerResult).reduce((agg, curr) => {
        agg += parseInt(triageAnswerResult[curr], 10);
        return agg;
      }, 0);

      setTriageScore(score);
      
      console.log('Parables', score)
      setSubmitted(true)
    }
  }, [activeStep, triageScore, triageAnswerResult, isLastStep, canEdit]);

  useEffect(() => {
    if(submitted && !result){
      let risk = LOW
      if (triageScore >= 5 && triageScore <= 9) {
        risk = MEDIUM
      }

      if(triageScore >= 10 && triageScore <= 39)  {
        risk = HIGH
      }
      parseRiskLevel(risk) 
      setResult(true)
    }
  }, [submitted]);




  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={3}>
        {!isLastStep() ? <Stepper
            activeStep={activeStep}
            style={{ backgroundColor: 'transparent' }}
            connector={<QontoConnector />}
            orientation="vertical">
            {questionCategory.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  classes={{
                    label: classes.stepLabel,
                    active: classes.stepLabelActive,
                    completed: classes.stepLabelCompleted
                  }}
                  StepIconComponent={QontoStepIcon}
                  disabled={label === 'Result'}
                  onClick={handleStep(index)}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper> : null
          }
        </Grid>
        <Grid item md={8} lg={9} style={{ padding: 33, overflowX: 'hidden' }}>
          <Fragment>
            {steps[activeStep] === 'Result' ? (
              <ResultContainer
                classes={classes}
                triageScore={triageScore}
                canEdit={canEdit}
              />
            ) : (
              <div>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={6} style={{ marginBottom: 20 }}>
                      {canEdit && (
                        <Grid container direction="column">
                          <Typography
                            style={{
                              fontWeight: '500',
                              color: '#231E1E',
                              fontSize: 18
                            }}>
                            {' '}
                            Please select all the statements that apply to you
                          </Typography>
                          <Typography
                            style={{ color: '#685E5E', fontSize: 15 }}>
                            {' '}
                            Select one answer in each row
                          </Typography>
                        </Grid>
                      )}
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
                    borderRight: '4px solid #EFA14B',
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
           <Box
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
          null
        )}
         {!isLastStep() ? 
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
          : null }
      </Box> 
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

const mapStateToProps = state => ({
  currentPatient: searchFilter.getCurrentPatient(state)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  createTriageMutation,
  createQueueHoc,
  sendSMS,
  createPatientCaseTriage
)(CreateTriage);
