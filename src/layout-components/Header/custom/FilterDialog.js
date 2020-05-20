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
import {
  LGA,
  TEAM,
  STATUS,
  UNDERLYING_ILLNESS,
  TRAVEL_HISTORY,
  GENDER,
  AGE
} from 'layout-components/Header/custom/filters';
import { makeStyles } from '@material-ui/styles';
import FormBuilder from 'bundles/patient/components/custom/formBuilder';

const useStyles = makeStyles(theme => ({
  text: {
    fontSize: 15,
    color: '#fff'
  },
  headerText: {
    fontSize: 20,
    color: '#231E1E',
    textAlign: 'center'
  },
  primaryButton: {
    backgroundColor: '#CB6A00',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    borderRadius: 50,
    textTransform: 'uppercase',
    boxShadow:
      '0 6px 16px rgba(203, 106, 0, 0.20), 0 2px 10px rgba(203, 106, 0, 0.10)',
    '&:hover': {
      backgroundColor: '#CB6A00',
      color: '#fff',
      fontSize: 13
    }
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#CB6A00',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    borderRadius: 50,
    textTransform: 'uppercase',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#CB6A00',
      fontSize: 13,
      boxShadow: 'none'
    }
  },
  dialog: {
    backgroundColor: 'transparent',
    // backgroundColor: '#2B2D40',
    boxShadow: 'none'
  },
  dialogheaderText: {
    fontSize: 24,
    color: '#231E1E',
    textAlign: 'center'
  },
  dialogContainer: {
    backgroundColor: 'rgba(246, 246, 246, 0.7)',
    backdropFilter: 'blur(4px)'
  },
  dialogCloseButton: {
    position: 'fixed',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#231E1E'
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

const renderFilter = (type, selection, setSelection, routerType) => {
  if (!type) return null;

  let renderData = {
    LGA: LGA(),
    TEAM: TEAM(),
    STATUS: STATUS(),
    UNDERLYING_ILLNESS: UNDERLYING_ILLNESS(),
    TRAVEL_HISTORY: TRAVEL_HISTORY(),
    GENDER: GENDER(),
    AGE: AGE()
  };

  let selectedNodes = {}
  if (selection[routerType] && selection[routerType][type]) {
    selectedNodes = selection[routerType][type]
  }

  return (
    <Fragment>
      {renderData[type].map(item => {
        return (
          <Grid key={item.key}>
            <Grid container alignItems="center" justify="center">
              {item.content.map((formElements, index) => {
                return (
                  <FormBuilder
                    key={`question--${index}`}
                    formInput={formElements}
                    setFormState={setSelection}
                    formState={selectedNodes}
                  />
                );
              })}
            </Grid>
          </Grid>
        );
      })}
    </Fragment>
  );
};

const FilterDialog = ({
  open,
  handleClose,
  title,
  actionText,
  cancelText,
  type = 'LGA',
  dispatchClick,
  setSelection,
  selection,
  routerType,
}) => {
  const classes = useStyles();
  const render = renderFilter(type, selection, setSelection, routerType);
 
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
      maxWidth={'sm'}>
      <DialogTitle id="form-dialog-title">
        <Typography className={classes.headerText}>{title}</Typography>
      </DialogTitle>
      <DialogContent>{render}</DialogContent>
      <div style={{ margin: '10px 0' }}>
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
      </div>
    </Dialog>
  );
};

export default FilterDialog;
