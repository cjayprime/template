import React, { Fragment } from 'react';
import {
  Grid,
  Typography,
  OutlinedInput,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

const TransformIcon = () => <KeyboardArrowDown color="primary" />;

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

const useStyles = makeStyles(theme => ({
  icon: {
    color: '#fff',
    borderColor: 'white'
  },
  labelText: {
    fontSize: 16,
    color: '#8E8CA7',
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
    color: '#8E8CA7'
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
  }
}));

const InputTextComp = (classes, input) => {
  let rows = null;
  const multiline = input.type === 'textArea' ? true : false;
  if (multiline) rows = 5;

  return (
    <OutlinedInput
      fullWidth
      placeholder={input.placeholder || ''}
      style={{ color: 'white' }}
      multiline={multiline}
      rows={rows}
      classes={{
        root: classes.cssOutlinedInput,
        focused: classes.cssFocused,
        notchedOutline: classes.notchedOutline
      }}
    />
  );
};

const TextTransform = ({ input }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      style={{ marginBottom: 15 }}
      direction={input.labelDirection}>
      <Grid xs={!input.labelDirection && 4}>
        <Typography className={classes.labelText}>{input.label}</Typography>
      </Grid>
      <Grid xs={!input.labelDirection && 8} className={classes.container}>
        {InputTextComp(classes, input )}
      </Grid>
    </Grid>
  );
};

const remapField = input =>
  input.fields.map(field => ({ label: field, value: field }));

const SelectFieldComp = (classes, input, mappedValue) => {
  const value = mappedValue || (input.fields && remapField(input));
  return (
    <TextField
      select
      fullWidth
      onChange={() => ''}
      InputProps={{
        className: classes.select
      }}
      SelectProps={{
        native: false,
        IconComponent: TransformIcon,
        icon: classes.icon
      }}
      variant="outlined">
      {value.map(option => (
        <MenuItem key={`${option.value}--${input.label}`} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

const generateDateTypes = (input, classes) => {
  return input.fields.map((date, index) => {
    const spacing = index < 2 ? 3 : 6;
    let mappedValue = year;

    if (date == 'DD') mappedValue = days;

    if (date == 'MM') mappedValue = month;

    return (
      <Grid item xs={spacing}>
        {' '}
        {SelectFieldComp(classes, input, mappedValue)}
      </Grid>
    );
  });
};

const generateRadioType = (input, classes) => {
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

const generateSelectType = (input, classes) => {
  const remap = input.fields && remapField(input);

  return (
    <Grid item xs={12}>
      {' '}
      {SelectFieldComp(classes, input, remap)}
    </Grid>
  );
};

const SelectTransform = ({ input }) => {
  const classes = useStyles();

  const selectType = {
    select: generateSelectType(input, classes),
    date: generateDateTypes(input, classes),
    radio: generateRadioType(input, classes)
  };

  return (
    <Grid
      container
      style={{ marginBottom: 15 }}
      direction={input.labelDirection}>
      <Grid xs={!input.labelDirection && 4}>
        <Typography className={classes.labelText}>{input.label}</Typography>
      </Grid>
      <Grid xs={!input.labelDirection && 8}>
        <Grid container direction="row" xs={12} spacing={0}>
          {selectType[input.type]}
        </Grid>
      </Grid>
    </Grid>
  );
};

const PhoneNumber = ({ input }) => {
  const classes = useStyles();
  return (
    <Grid container style={{ marginBottom: 15 }}>
      <Grid xs={4}>
        <Typography className={classes.labelText}>{input.label}</Typography>
      </Grid>
      <Grid xs={8}>
        <Grid container direction="row" xs={12} spacing={0}>
          <Grid item xs={3}>
            {SelectFieldComp(classes, input)}
          </Grid>
          <Grid item xs={9}>
            {InputTextComp(classes, input)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const renderType = input => {
  switch (input.type) {
    case 'text':
      return <TextTransform input={input} />;

    case 'date':
      return <SelectTransform input={input} />;

    case 'radio':
      return <SelectTransform input={input} />;

    case 'select':
      return <SelectTransform input={input} />;

    case 'textArea':
      return <TextTransform input={input} />;

    case 'phone':
      return <PhoneNumber input={input} />;

    default:
      return <TextTransform input={input} />;
  }
};

const FormBuilder = ({ formInput }) => {
  return <Fragment>{renderType(formInput)}</Fragment>;
};

export default FormBuilder;
