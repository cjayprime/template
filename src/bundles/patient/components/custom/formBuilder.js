import React, { Fragment, useState } from 'react';
import {
  Grid,
  Typography,
  OutlinedInput,
  TextField,
  RadioGroup,
  FormControlLabel,
  Button,
  createMuiTheme,
  Checkbox,
  Radio
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { ThemeProvider } from '@material-ui/styles';
// import EventAvailable from '@material-ui/icons/EventAvailable';

const TransformIcon = () => (
  <KeyboardArrowDown color="primary" style={{ color: '#fff' }} />
);

const TransformButtonIcon = ({ props }) => (
  <Button {...props}>
    <KeyboardArrowDown color="primary" style={{ color: '#fff' }} />
  </Button>
);

const ERROR_STAR_CONSTANT = '#f44336'

const days = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '6' },
  { label: '7', value: '7' }
];
const month = [
  { label: '1', value: 'January' },
  { label: '2', value: 'February' },
  { label: '3', value: 'March' },
  { label: '4', value: 'April' }
];

const year = [
  { label: '1988', value: '1988' },
  { label: '1989', value: '1989' },
  { label: '1990', value: '1990' }
];

export const DefaultCheckbox = withStyles({
  root: {
    color: '#CACACA',
    '&$checked': {
      color: '#6EA915'
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(theme => ({
  errorText: {
    color: '#f44336',
    marginBottom: 10,
  },
  icon: {
    color: '#fff',
    borderColor: 'white'
  },
  labelText: {
    fontSize: 16,
    color: '#685E5E',
    paddingTop: 10
  },
  container: {
    marginBottom: 10
  },
  select: {
    color: '#8F8D8C',
    backgroundColor: '#E9E8E8',
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
    color: '#8E8CA7'
  },
  selectElement: {
    borderColor: 'transparent !important',
    backgroundColor: '#E9E8E8'
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`
    },
    backgroundColor: '#E9E8E8',
    color: '#8F8D8C'
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
    backgroundColor: '#E9E8E8'
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
        paddingRight: 5,
        color: '#fff'
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

export const capitalizeFirstWord = word =>
  word && word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

const InputTextComp = (
  classes,
  input,
  setFormState = () => '',
  formState = {}
) => {
  let rows = null;
  const multiline = input.type === 'textArea' ? true : false;
  if (multiline) rows = 5;

  let nonValid = false;
  if (
    formState[input.key] !== undefined &&
    formState[input.key] == '' &&
    input.required
  ) {
    nonValid = true;
  }

  return (
    <Fragment>
      {nonValid && input.labelDirection !== "column" ? 
        <Typography className={classes.errorText}>
          Enter {capitalizeFirstWord(input.key)}
        </Typography> 
        : null
      }
    <OutlinedInput
      fullWidth
      placeholder={input.placeholder || ''}
      type={input.type == 'password'? 'password': undefined}
      style={{ color: 'white' }}
      defaultValue={input.defaultValue || ''}
      error={nonValid}
      multiline={multiline}
      type={input.type}
      onChange={e =>
        input.capitalize
          ? setFormState({ [input.key]: capitalizeFirstWord(e.target.value) })
          : setFormState({ [input.key]: e.target.value })
      }
      rows={rows}
      classes={{
        root: nonValid ? undefined : classes.cssOutlinedInput,
        focused: nonValid ? undefined:   classes.cssFocused,
        notchedOutline: nonValid? undefined:  classes.notchedOutline
      }}
    />
    </Fragment>
  );
};

const CheckBoxComp = (
  classes,
  input,
  setFormState = () => '',
  formState = {}
) => {
  return (
    <FormControlLabel
      control={
        <DefaultCheckbox
          checked={formState[input.key] ? true : false}
          onChange={e => setFormState({ [input.key]: e.target.checked })}
        />
      }
      label={<Typography style={{ color: '#fff' }}> {input.label}</Typography>}
    />
  );
};

const TextTransform = ({ input, setFormState, formState }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      style={{ marginBottom: 15 }}
      direction={input.labelDirection}>
      <Grid item xs={!input.labelDirection && 4}>
        <Typography className={classes.labelText}>{input.label} {input.required ? 
        <span style={{color: ERROR_STAR_CONSTANT}}>*</span> : null
         } 
      </Typography>
      </Grid>
      <Grid item xs={!input.labelDirection && 8} className={classes.container}>
        {InputTextComp(classes, input, setFormState, formState)}
      </Grid>
    </Grid>
  );
};

const CheckBoxTransform = ({ input, setFormState, formState }) => {
  const classes = useState();

  return (
    <Fragment>
      <Grid xs={6} md={6} className={classes.container}>
        {CheckBoxComp(classes, input, setFormState, formState)}
      </Grid>
    </Fragment>
  );
};

const remapField = input =>
  input.fields.map(field => ({ label: field, value: field }));

const SelectFieldComp = (
  classes,
  input,
  mappedValue,
  setFormState = () => '',
  formState = {},
  keyValue
) => {
  const value = mappedValue || (input.fields && remapField(input));
  let enteredValue = '';
  let addedValue = '';
  let nonValid = false;
  if (keyValue) {
    addedValue = `-${keyValue}`;
  }
  if (formState && formState[`${input.key}${addedValue}`]) {
    enteredValue = formState[`${input.key}${addedValue}`];
  }

  if (formState && formState[`${input.key}${addedValue}`]?.length < 1 && input.required) {
    nonValid = true
  }

  

  return (
    <Fragment>
      {nonValid ? <Typography className={classes.errorText}>Enter {capitalizeFirstWord(input.key)}</Typography> : null}
    <TextField
      select
      fullWidth
      InputProps={{
        className: classes.select
      }}
      onChange={e =>
        setFormState({ [`${input.key}${addedValue}`]: e.target.value })
      }
      value={enteredValue}
      error={nonValid}
      placeholder={'DD'}
      disabled={input.disabled}
      SelectProps={{
        native: false,
        IconComponent: TransformButtonIcon,
        icon: classes.icon
      }}
      variant="outlined">
      {value.map(option => (
        <MenuItem key={`${option.value}--${input.label}`} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
    </Fragment>
  );
};

const generateDateTypes = (
  input,
  classes,
  setFormState = () => '',
  formState = {}
) => {
  if (input.label == 'Time') {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={dateInputTheme}>
          <KeyboardTimePicker
            variant="inline"
            inputVariant="filled"
            margin="normal"
            id={input.key}
            value={formState[input.key]}
            onChange={date => setFormState({ [input.key]: date })}
            fullWidth={true}
            keyboardIcon={<TransformIcon style={{ color: '#fff' }} />}
            animateYearScrolling
            autoOk
          />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={dateInputTheme}>
        <KeyboardDatePicker
          variant="inline"
          inputVariant="filled"
          format="dd/MM/yyyy"
          margin="normal"
          id={input.key}
          value={formState[input.key]}
          onChange={date => setFormState({ [input.key]: date })}
          fullWidth={true}
          views={['year', 'date', '']}
          keyboardIcon={<TransformIcon style={{ color: '#fff' }} />}
          animateYearScrolling
          autoOk
          minDate={input.future  ? new Date() : undefined}
          maxDate={input.future ? undefined : new Date()}
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

const generateRadioType = (input, classes, setFormState) => {
  return (
    <RadioGroup
      style={{ display: 'flex', flexDirection: 'row' }}
      name={input.label}
      onChange={() => ''}>
      {input.fields.map((field, i) => {
        return (
          <FormControlLabel
            key={`${input.label}${i}`}
            value={field}
            classes={{
              root: classes.radio
            }}
            control={
              <Radio
                onChange={e => setFormState({ [input.key]: e.target.value })}
                color="primary"
                classes={{
                  colorPrimary: classes.radio
                }}
              />
            }
            label={field}
          />
        );
      })}
    </RadioGroup>
  );
};

const generateSelectType = (input, classes, setFormState, formState) => {
  const remap = input.fields && remapField(input);

  return (
    <Grid item xs={12}>
      {' '}
      {SelectFieldComp(classes, input, remap, setFormState, formState)}
    </Grid>
  );
};

export const SelectTransform = ({ input, setFormState, formState }) => {
  const classes = useStyles();

  const selectType = {
    select: generateSelectType(input, classes, setFormState, formState),
    date: generateDateTypes(input, classes, setFormState, formState),
    radio: generateRadioType(input, classes, setFormState)
  };

  return (
    <Grid
      container
      style={{ marginBottom: 15 }}
      direction={input.labelDirection}>
      <Grid item xs={!input.labelDirection && 4}>
        <Typography className={classes.labelText}>{input.label}
        {input.required ? 
        <span style={{color: ERROR_STAR_CONSTANT}}>*</span> : null
        }
        </Typography>
      </Grid>
      <Grid item xs={!input.labelDirection && 8}>
        <Grid item container direction="row" xs={12} spacing={0}>
          {selectType[input.type]}
        </Grid>
      </Grid>
    </Grid>
  );
};

const PhoneNumber = ({ input, setFormState, formState }) => {
  const classes = useStyles();
  return (
    <Grid container style={{ marginBottom: 15 }}>
      <Grid xs={4}>
        <Typography className={classes.labelText}>{input.label}
        {input.required ? 
         <span style={{color: ERROR_STAR_CONSTANT}}>*</span> : null
        }
        </Typography>
      </Grid>
      <Grid xs={8}>
        <Grid container direction="row" xs={12} spacing={0}>
          { /*<Grid item xs={3}>
            {SelectFieldComp(
              classes,
              input,
              [{ label: '+234', value: '+234' }],
              setFormState,
              formState
            )}
            </Grid> */}
          <Grid item xs={12}>
            {InputTextComp(classes, input, setFormState, formState)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const TextFormDetail = ({ input }) => {
  const classes = useStyles();

  return (
    <Grid container xs={12}>
      <Grid item xs={3}>
        <Typography className={classes.labelText}>{input.title}</Typography>
      </Grid>

      {input.content.map((item, index) => {
        const key = Object.keys(item);

        if (input.fullWidth) {
          return (
            <Grid item key={`text--${item[key]}-${index}`} xs={8}>
              <Typography className={classes.labelText}>{item[key]}</Typography>
            </Grid>
          );
        } else {
          return (
            <Grid item key={`text--${item[key]}-${index}`} xs={3}>
              <Typography>{key}</Typography>
              <Typography>{item[key]}</Typography>
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

const renderType = (input, setFormState, formState) => {
  switch (input.type) {
    case 'text' || 'password' || 'email':
      return (
        <TextTransform
          setFormState={setFormState}
          input={input}
          formState={formState}
        />
      );

    case 'date':
      return (
        <SelectTransform
          setFormState={setFormState}
          input={input}
          formState={formState}
        />
      );

    case 'radio':
      return (
        <SelectTransform
          setFormState={setFormState}
          input={input}
          formState={formState}
        />
      );

    case 'select':
      return (
        <SelectTransform
          setFormState={setFormState}
          input={input}
          formState={formState}
        />
      );

    case 'textArea':
      return (
        <TextTransform
          setFormState={setFormState}
          input={input}
          formState={formState}
        />
      );

    case 'phone':
      return (
        <PhoneNumber
          setFormState={setFormState}
          input={input}
          formState={formState}
        />
      );

    case 'checkbox':
      return (
        <CheckBoxTransform
          setFormState={setFormState}
          input={input}
          formState={formState}
        />
      );

    case 'detail':
      return <TextFormDetail input={input} />;

    default:
      return (
        <TextTransform
          setFormState={setFormState}
          input={input}
          formState={formState}
        />
      );
  }
};

const FormBuilder = ({ formInput, setFormState, formState }) => {
  return <Fragment>{renderType(formInput, setFormState, formState)}</Fragment>;
};

export default FormBuilder;
