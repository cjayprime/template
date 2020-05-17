import React, { Fragment } from 'react';
import { TextField } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { InputStyles } from './index.style';

export const Input = props => {
  const classes = InputStyles();
  return (
    <TextField
      select={props.select}
      variant="filled"
      fullWidth
      name={props.name}
      className={classes.TextInputContainer}
      InputProps={{
        classes: { root: classes.InputView },
        disableUnderline: true,
        defaultValue: props.defaultValue || ''
      }}
      SelectProps={{
        IconComponent: () => (
          <KeyboardArrowDownIcon className={classes.SelectInputIcon} />
        ),
        classes: { filled: classes.SelectInput }
      }}>
      {props.select && (
        <Fragment>
          {[{ value: '' }, ...props.options].map(opt => (
            <option value={opt.value}>{opt.value}</option>
          ))}
        </Fragment>
      )}
    </TextField>
  );
};
