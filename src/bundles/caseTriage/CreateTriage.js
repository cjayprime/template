import React, { Fragment, useState } from 'react';

import {
  Grid,
  Stepper,
  Step,
  StepButton,
  Button,
  Box,
  makeStyles
} from '@material-ui/core';

import Question from './components/question';

// Mutations
import createTriageMutation from 'bundles/patient/hoc/createTriageAnswers';

// Assets
import triageQuestions from './questions.json';

const compose = require('lodash')?.flowRight;
const steps = Reflect.ownKeys(triageQuestions);
steps.push('Result');

const useStyles = makeStyles(theme => ({
  nextButton: {
    backgroundColor: '#27BAC0',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    borderRadius: 50,
    textTransform: 'uppercase',
    boxShadow:
      '0 6px 16px rgba(39, 186, 192, 0.20), 0 2px 10px rgba(39, 186, 192, 0.10)'
  },
  backButton: {
    backgroundColor: 'transparent',
    color: '#fff',
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

const CreateTriage = ({ createTriage }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed] = useState({});
  const [answers, setAnswers] = useState({});
  const questionCategory = steps;
  const classes = useStyles();

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
          <Stepper activeStep={activeStep} orientation="vertical">
            {questionCategory.map((label, index) => (
              <Step key={label}>
                <StepButton
                  disabled={label === 'Result'}
                  onClick={handleStep(index)}
                  completed={completed[index]}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item md={9} lg={7}>
          <Fragment>
            {steps[activeStep] === 'Result' ? (
              'Oreofe'
            ) : (
              <div>
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
            <Box display="flex" flexDirection="row-reverse">
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
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default compose(createTriageMutation)(CreateTriage);
