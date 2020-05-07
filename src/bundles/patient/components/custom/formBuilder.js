import React, { Fragment, useState } from 'react';
import {
  Grid,
  Typography,
  OutlinedInput,
  TextField,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Radio
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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

export const DefaultCheckbox = withStyles({
  root: {
    color: '#fff',
    '&$checked': {
      color: '#fff'
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(theme => ({
  icon: {
    color: '#fff',
    borderColor: 'white'
  },
  labelText: {
    fontSize: 16,
    color: '#fff',
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

const capitalizeFirstWord = word =>
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
    <OutlinedInput
      fullWidth
      placeholder={input.placeholder || ''}
      style={{ color: 'white' }}
      error={nonValid}
      multiline={multiline}
      onChange={e =>
        input.capitalize
          ? setFormState({ [input.key]: capitalizeFirstWord(e.target.value) })
          : setFormState({ [input.key]: e.target.value })
      }
      rows={rows}
      classes={{
        root: classes.cssOutlinedInput,
        focused: classes.cssFocused,
        notchedOutline: classes.notchedOutline
      }}
    />
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
      <Grid xs={!input.labelDirection && 4}>
        <Typography className={classes.labelText}>{input.label}</Typography>
      </Grid>
      <Grid xs={!input.labelDirection && 8} className={classes.container}>
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
  if (keyValue) {
    addedValue = `-${keyValue}`;
  }

  if (formState && formState[`${input.key}${addedValue}`]) {
    enteredValue = formState[`${input.key}${addedValue}`];
  }

  return (
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
      placeholder={'DD'}
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

const generateDateTypes = (input, classes, setFormState, formState) => {
  return input.fields.map((date, index) => {
    const spacing = index < 2 ? 3 : 6;
    let value = 'y';

    let mappedValue = year;

    if (date == 'DD') {
      mappedValue = days;
      value = 'd';
    }

    if (date == 'MM') {
      mappedValue = month;
      value = 'm';
    }

    return (
      <Grid key={`${index}--${input.label}`} item xs={spacing}>
        {' '}
        {SelectFieldComp(
          classes,
          input,
          mappedValue,
          setFormState,
          formState,
          value
        )}
      </Grid>
    );
  });
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

const SelectTransform = ({ input, setFormState, formState }) => {
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

const PhoneNumber = ({ input, setFormState, formState }) => {
  const classes = useStyles();
  return (
    <Grid container style={{ marginBottom: 15 }}>
      <Grid xs={4}>
        <Typography className={classes.labelText}>{input.label}</Typography>
      </Grid>
      <Grid xs={8}>
        <Grid container direction="row" xs={12} spacing={0}>
          <Grid item xs={3}>
            {SelectFieldComp(
              classes,
              input,
              [{ label: '+234', value: '+234' }],
              setFormState,
              formState
            )}
          </Grid>
          <Grid item xs={9}>
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
        return (
          <Grid item key={`text--${item.firstLabel}-${index}`} xs={3}>
            <Grid>
              <Typography >{key}</Typography>
              <Typography>{item[key]}</Typography>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

const renderType = (input, setFormState, formState) => {
  switch (input.type) {
    case 'text':
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
      return (
        <TextFormDetail input={input} />
      )

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
