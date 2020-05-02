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

const TextTransform = ({ input }) => {
  const classes = useStyles();
  return (
    <Grid container style={{ marginBottom: 15 }}>
      <Grid xs={4}>
        <Typography className={classes.labelText}>{input.label}</Typography>
      </Grid>
      <Grid xs={8} className={classes.container}>
        <OutlinedInput
          fullWidth
          style={{ color: 'white' }}
          classes={{
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline
          }}
        />
      </Grid>
    </Grid>
  );
};

const TextAreaTransform = ({ input }) => {
  const classes = useStyles();
  return (
    <Grid container style={{ marginBottom: 15 }}>
      <Grid xs={4}>
        <Typography className={classes.labelText}>{input.label}</Typography>
      </Grid>
      <Grid xs={8} className={classes.container}>
        <OutlinedInput
          fullWidth
          multiline={true}
          rows={5}
          style={{ color: 'white' }}
          classes={{
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline
          }}
        />
      </Grid>
    </Grid>
  );
};

const DateTransform = ({ input }) => {
  const classes = useStyles();
  return (
    <Grid container style={{ marginBottom: 15 }}>
      <Grid xs={4}>
        <Typography className={classes.labelText}>{input.label}</Typography>
      </Grid>
      <Grid xs={8}>
        <Grid container direction="row" xs={12} spacing={0}>
          <Grid item xs={3}>
            <TextField
              select
              onChange={() => ''}
              fullWidth
              InputProps={{
                className: classes.select
              }}
              SelectProps={{
                native: false,
                IconComponent: TransformIcon,
                icon: classes.icon
              }}
              variant="outlined">
              {[
                { value: '1' },
                { value: '2' },
                { value: '3' },
                { value: '4' }
              ].map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value + 'mm'}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              onChange={() => ''}
              SelectProps={{
                native: false,
                IconComponent: TransformIcon,
                icon: classes.icon
              }}
              InputProps={{
                className: classes.select
              }}
              variant="outlined">
              {[
                { value: '1' },
                { value: '2' },
                { value: '3' },
                { value: '4' }
              ].map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value + 'dd'}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              onChange={() => ''}
              SelectProps={{
                native: false,
                IconComponent: TransformIcon,
                icon: classes.icon
              }}
              InputProps={{
                className: classes.select
              }}
              variant="outlined">
              {[
                { value: '1' },
                { value: '2' },
                { value: '3' },
                { value: '4' }
              ].map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value + 'yy'}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const RadioTransform = ({ input }) => {
  const classes = useStyles();
  return (
    <Grid container style={{ marginBottom: 15 }}>
      <Grid xs={4}>
        <Typography className={classes.labelText}>{input.label}</Typography>
      </Grid>
      <Grid xs={8}>
        <RadioGroup
          style={{ display: 'flex', flexDirection: 'row' }}
          aria-label="gender"
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
      </Grid>
    </Grid>
  );
};

const SelectFields = ({ input }) => {
  const classes = useStyles();

  return (
    <Grid container style={{ marginBottom: 15 }}>
      <Grid xs={4}>
        <Typography className={classes.labelText}>{input.label}</Typography>
      </Grid>

      <Grid xs={8}>
        <Grid container direction="row" xs={12} spacing={0}>
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
            {[
              { value: 'Lagos' },
              { value: 'Lagos'  },
              { value: '3' },
              { value: '4' }
            ].map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.value + 'mm'}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
};

const PhoneNumber = ({input}) => {

    const classes = useStyles();
    return (
      <Grid container style={{ marginBottom: 15 }}>
        <Grid xs={4}>
          <Typography className={classes.labelText}>{input.label}</Typography>
        </Grid>
        <Grid xs={8}>
          <Grid container direction="row" xs={12} spacing={0}>
            <Grid item xs={3}>
              <TextField
                select
                fullWidth
                onChange={() => ''}
                SelectProps={{
                  native: false,
                  IconComponent: TransformIcon,
                  icon: classes.icon
                }}
                InputProps={{
                  className: classes.select
                }}
                variant="outlined">
                {[
                  { value: '1' },
                  { value: '2' },
                  { value: '3' },
                  { value: '4' }
                ].map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value + 'dd'}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={9}>
              <TextField
                select
                fullWidth
                onChange={() => ''}
                SelectProps={{
                  native: false,
                  IconComponent: TransformIcon,
                  icon: classes.icon
                }}
                InputProps={{
                  className: classes.select
                }}
                variant="outlined">
                {[
                  { value: '1' },
                  { value: '2' },
                  { value: '3' },
                  { value: '4' }
                ].map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value + 'yy'}
                  </MenuItem>
                ))}
              </TextField>
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
      return <DateTransform input={input} />;

    case 'radio':
      return <RadioTransform input={input} />;

    case 'select':
      return <SelectFields input={input} />;

    case 'textArea':
      return <TextAreaTransform input={input} />;

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
