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
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

const DateQuestionType = ({ question }) => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18')
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

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
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
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
