import React, { Fragment } from 'react';
import {
  Grid,
  Typography,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FormBuilder from 'bundles/patient/components/custom/formBuilder';

const useStyles = makeStyles(theme => ({
  text: {
    fontSize: 15,
    color: '#fff'
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  primaryButton: {
    backgroundColor: '#27BAC0',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    borderRadius: 50,
    textTransform: 'uppercase',
    boxShadow:
      '0 6px 16px rgba(39, 186, 192, 0.20), 0 2px 10px rgba(39, 186, 192, 0.10)',
    '&:hover': {
      backgroundColor: '#27BAC0',
      color: '#fff',
      fontSize: 13
    }
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    borderRadius: 50,
    textTransform: 'uppercase',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#fff',
      fontSize: 13,
      boxShadow: 'none'
    }
  },
  dialog: {
    backgroundColor: 'transparent',
    // backgroundColor: '#2B2D40',
    boxShadow: 'none'
  },
  dialogContainer: {
    backgroundColor: 'rgba(246, 246, 246, 0.7)',
    backdropFilter: 'blur(4px)'
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
  actionButtons: {
    backgroundColor: 'transparent',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 0',
    borderRadius: 50,
    marginRight: 5,
    textTransform: 'uppercase',
    color: '#8EE2E5',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#8EE2E5'
    }
  },
  actionDeleteButton: {
    backgroundColor: 'transparent',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 0',
    borderRadius: 50,
    marginRight: 5,
    textTransform: 'uppercase',
    color: '#EEBEC2',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#EEBEC2'
    }
  }
}));

const QueueDialog = ({ open, handleClose, render }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      fullWidth={true}
      classes={{
        paper: classes.dialog,
        root: classes.dialogRoot,
        container: classes.dialogContainer
      }}
      maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">
        <Typography className={classes.headerText}>{''}</Typography>
      </DialogTitle>
      <DialogContent>{render}</DialogContent>
      {/*<div style={{ margin: '10px 0' }}>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={dispatchClick}
            classes={{ root: classes.primaryButton }}>
            {actionText}
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" style={{ marginTop: 15 }}>
          <Button
            classes={{
              root: classes.secondaryButton,
              focusVisible: classes.secondaryButton
            }}
            onClick={() => handleClose(true)} 
            variant="contained">
            {cancelText}
          </Button>
        </Box>
          </div>*/}
    </Dialog>
  );
};

export default QueueDialog;
