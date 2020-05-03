import React, { Fragment } from 'react';

import { 
  Grid, 
  makeStyles, 
  createMuiTheme, 
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  OutlinedInput,
  MenuItem
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { ThemeProvider } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  icon: {
    color: '#fff',
    borderColor: 'white'
  },
  labelText: {
    fontSize: 16,
    color: '#FFFFFF',
    paddingTop: 10
  },
  container: {
    marginBottom: 10
  },
  select: {
    color: '#fff',
    backgroundColor: '#474562',
    '&:focus': {
      borderColor: 'transparent !important'
    },
    '&$cssFocused': {
      borderColor: 'transparent !important'
    },
    '&:hover': {
      borderColor: 'transparent !important'
    }
  },
  radio: {
    color: '#FFFFFF'
  },
  selectElement: {
    borderColor: 'transparent !important',
    backgroundColor: '#474562'
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`
    },
    backgroundColor: '#474562',
    color: '#fff'
  },
  cssFocused: {},
  notchedOutline: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`
    },
    borderWidth: '1px',
    borderColor: 'transparent !important',
    color: 'white'
  },
  underline: {
    backgroundColor: '#474562'
  },
  dateCssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`
    },
    backgroundColor: '#474562',
    color: '#fff',
    // padding: '18.5px 14px;',
    borderRadius: 10
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

const TransformIcon = () => <KeyboardArrowDown color="primary" />;

const DateQuestionType = ({ question, questionKey, answer, onAnswer }) => {
  const selectedDate = answer ? new Date(answer) : null;
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Typography className={classes.labelText}>{question}</Typography>
        </Grid>
        <Grid item md={8}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={dateInputTheme}>
              <KeyboardDatePicker
                variant="inline"
                inputVariant="filled"
                format="dd/MM/yyyy"
                margin="normal"
                id={questionKey}
                value={selectedDate}
                onChange={date => onAnswer(questionKey, date)}
                fullWidth={true}
                views={['year', 'date', '']}
                animateYearScrolling
                autoOk
                maxDate={new Date()}
              />
            </ThemeProvider>
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

const InputTextComp = (classes, input) => {
  const { type, answer, questionKey, onAnswer, placeholder } = input;
  let rows = null;
  const multiline = type === 'textArea' ? true : false;
  if (multiline) rows = 5;

  return (
    <OutlinedInput
      fullWidth
      placeholder={placeholder || ''}
      style={{ color: 'white' }}
      multiline={multiline}
      rows={rows}
      value={answer}
      onChange={e => onAnswer(questionKey, e.target.value)}
      classes={{
        root: classes.cssOutlinedInput,
        focused: classes.cssFocused,
        notchedOutline: classes.notchedOutline
      }}
    />
  );
};

const StringQuestionType = ({ question, answer, questionKey, onAnswer }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Typography className={classes.labelText}>{question}</Typography>
        </Grid>
        <Grid item md={8}>
          {InputTextComp(classes, {
            type: 'text',
            answer,
            questionKey,
            onAnswer
          })}
        </Grid>
      </Grid>
    </Fragment>
  );
};

StringQuestionType.defaultProps = {
  answer: '',
  onAnswer: () => {}
};

const SelectQuestionType = ({ question, answer, questionKey, onAnswer }) => {
  const classes = useStyles();
  const values = [
    {
      label: 'label',
      value: 'value'
    }
  ];

  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Typography className={classes.labelText}>{question}</Typography>
        </Grid>
        <Grid item md={8}>
          <TextField
            select
            fullWidth
            value={answer}
            onChange={e => onAnswer(questionKey, e.target.value)}
            InputProps={{
              className: classes.select
            }}
            SelectProps={{
              native: false,
              IconComponent: TransformIcon,
              icon: classes.icon
            }}
            variant="outlined">
            {values.map(option => (
              <MenuItem
                key={`${option.value}--${questionKey}`}
                value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Typography className={classes.labelText}>{question}</Typography>
        </Grid>
        <Grid item md={8}>
          <RadioGroup
            style={{ display: 'flex', flexDirection: 'row' }}
            name={questionKey}
            value={answer}
            onChange={e => onAnswer(questionKey, e.target.value)}>
            <Grid container justify="space-between">
              {options.map(option => (
                <FormControlLabel
                  key={`${questionKey}-${option}`}
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
