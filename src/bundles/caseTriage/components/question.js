import React, { Fragment } from 'react';

import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

const DateQuestionType = ({ question, questionKey, answer, onAnswer }) => {
  const selectedDate = answer ? new Date(answer) : null;

  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Typography>{question}</Typography>
        </Grid>
        <Grid item md={8}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              margin="normal"
              id={questionKey}
              label="Date picker inline"
              value={selectedDate}
              onChange={date => onAnswer(questionKey, date)}
              fullWidth={true}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </Fragment>
  );
};

DateQuestionType.defaultProps = {
  answer: null,
  onAnswer: () => {}
};

const StringQuestionType = ({ question, answer, questionKey, onAnswer }) => {
  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Typography>{question}</Typography>
        </Grid>
        <Grid item md={8}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            fullWidth={true}
            value={answer}
            onChange={e => onAnswer(questionKey, e.target.value)}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

StringQuestionType.defaultProps = {
  answer: '',
  onAnswer: () => {}
};

const SelectQuestionType = ({ question }) => {
  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Typography>{question}</Typography>
        </Grid>
        <Grid item md={8}>
          select answer input
        </Grid>
      </Grid>
    </Fragment>
  );
};

SelectQuestionType.defaultProps = {
  answer: '',
  onAnswer: () => {}
};

const MultiChoiceQuestionType = ({
  question,
  options,
  questionKey,
  answer,
  onAnswer
}) => {
  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Typography>{question}</Typography>
        </Grid>
        <Grid item md={8}>
          <RadioGroup
            aria-label={questionKey}
            name={questionKey}
            value={answer}
            onChange={e => onAnswer(questionKey, e.target.value)}>
            <Grid container justify="space-between">
              {options.map(option => (
                <FormControlLabel
                  key={`${questionKey}-${option}`}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </Grid>
          </RadioGroup>
        </Grid>
      </Grid>
    </Fragment>
  );
};

MultiChoiceQuestionType.defaultProps = {
  answer: '',
  onAnswer: () => {}
};

const Question = props => {
  const { question, type } = props;
  switch (type) {
    case 'DATE_TYPE':
      return <DateQuestionType {...props} />;
    case 'STRING_TYPE':
      return <StringQuestionType {...props} />;
    case 'SELECT_TYPE':
      return <SelectQuestionType {...props} />;
    case 'MULTI_TYPE':
      return <MultiChoiceQuestionType {...props} />;
    default:
      return <div>{question}</div>;
  }
};

export default Question;
