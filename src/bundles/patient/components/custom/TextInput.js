import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Input,
  InputAdornment,
  IconButton
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Arrow from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
  },
  padding: {
    padding: 10
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '100%'
  },
  iconButton: {
    padding: 10
  },
  searchIcon: {
    color: '#fff',
    fontSize: 35
  },
  margin: {
    paddingLeft: 100,
    paddingRight: 100
  },
  divider: {
    height: 28,
    margin: 4
  },
  roundedButton: {
    borderRadius: 50,
    backgroundColor: '#28BAC0',
    '&:hover': {
      backgroundColor: '#28BAC0'
    }
  },
  roundedIcon: {
    fontSize: 35,
    color: '#fff'
  },
  underline: {
    '&:before': {
      borderBottom: '1px solid #6A6981'
    },
    '&:hover': {
      borderBottom: '1px solid #6A6981'
    },
    '&:after': {
      borderBottom: '1px solid #6A6981' // make white
    },
    '&:hover:not($disabled):not($focused):not($error):before': {
      borderBottom: 'none !important'
    }
  } //  "&:hover:not($disabled):not($focused):not($error):before": {
}));

/*
.MuiInput-underline:hover:not(.Mui-disabled):before
*/

export default function CustomizedInputBase({ change, disableUnderline }) {
  const classes = useStyles();

  const showEnter = (
    <IconButton className={classes.roundedButton}>
      <Arrow className={classes.roundedIcon} />
    </IconButton>
  );

  const showClose = (
    <IconButton>
      {' '}
      <CloseIcon />{' '}
    </IconButton>
  );

  return (
    <FormControl fullWidth className={classes.margin}>
      <Input
        style={{ padding: 20, fontSize: 20, color: '#fff', fontWeight: 'bold' }}
        onChange={e => change(e.target.value)}
        classes={{
          underline: classes.underline
        }}
        disableUnderline={disableUnderline}
        startAdornment={
          <InputAdornment style={{ marginLeft: 20 }} position="start">
            <SearchIcon className={classes.searchIcon} />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment
            style={{ marginRight: 20, marginBottom: 5 }}
            position="end">
            {disableUnderline ? showClose : showEnter}
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
