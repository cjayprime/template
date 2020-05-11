import React, { Fragment, useState } from 'react';
import classnames from 'classnames';
import {
  Grid,
  makeStyles,
  OutlinedInput,
  FormControlLabel,
  Typography,
  Button
} from '@material-ui/core';

import { DefaultCheckbox } from 'bundles/patient/components/custom/formBuilder';

const useStyles = makeStyles(theme => ({
  regLabelText: {
    fontSize: 15,
    color: '#fff'
  },
  LabelText: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 9
  },
  formButton: {
    boxShadow: 'none',
    borderRadius: 20,
    textTransform: 'none',
    border: 'none',
    color: 'white',
    lineHeight: 1.5,
    fontSize: 16,
    padding: '10px 50px 10px'
  },
  formButtonTS: {
    backgroundColor: '#28BAC0',
    boxShadow:
      '0 6px 16px rgba(39, 186, 192, 0.20), 0 2px 10px rgba(39, 186, 192, 0.10)',
    '&:hover': {
      backgroundColor: '#28BAC0',
      border: 'none'
    },
    '&:active': {
      backgroundColor: '#28BAC0',
      border: 'none'
    }
  },
  input: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`
    },
    backgroundColor: '#474562',
    color: '#fff'
  },
  inputFocused: {},
  inputNotch: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`
    },
    borderWidth: '1px',
    borderColor: 'transparent !important',
    color: 'white'
  },
  sectionHeader: {
    fontSize: 17,
    color: '#fff'
  }
}));

export const InpatientComponent = () => {
  const classes = useStyles();
  const [displayForm, setDisplayForm] = useState(false);

  const onValueChange = () => {
    setDisplayForm(!displayForm);
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item>
          <FormControlLabel
            onChange={onValueChange}
            control={<DefaultCheckbox name="markPatientAsDead" />}
            value={displayForm}
            label={
              <Typography classes={{ root: classes.regLabelText }}>
                {' '}
                Admit Patient
              </Typography>
            }
          />
        </Grid>
      </Grid>
      {displayForm && (
        <Fragment>
          <Grid container>
            <Grid item xs={6}>
              <Typography classes={{ root: classes.LabelText }}>
                Center
              </Typography>
              <div>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  value={'ooo'}
                  onChange={() => {}}
                  classes={{
                    root: classes.input,
                    focused: classes.inputFocused,
                    notchedOutline: classes.inputNotch
                  }}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 24 }}>
            <Grid item xs={12}>
              <Typography classes={{ root: classes.LabelText }}>
                Enter notes
              </Typography>
              <div>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  value={'ooo'}
                  multiline
                  rows={3}
                  onChange={() => {}}
                  classes={{
                    root: classes.input,
                    focused: classes.inputFocused,
                    notchedOutline: classes.inputNotch
                  }}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container justify="flex-end" style={{ marginTop: 24 }}>
            <Button className={classes.formButton}>CANCEL</Button>
            <Button
              disableElevation={false}
              className={classnames(classes.formButton, classes.formButtonTS)}>
              SAVE
            </Button>
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};
