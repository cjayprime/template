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
import { DataTable } from 'bundles/shared/components/Datatable';
import moment from 'moment';

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
  },
  Table: {
    backgroundColor: 'transparent'
  },
  HeaderTableCell: {
    color: '#BDB8D9',
    fontSize: 13,
    textTransform: 'uppercase',
    fontWeight: 400,
    border: 0,
    paddingTop: 0,
    paddingBottom: 12,
    '&:first-child': {
      paddingLeft: 0
    },
    '&:last-child': {
      maxWidth: 150
    }
  },
  TableCell: {
    paddingTop: 12,
    textTransform: 'capitalize',
    '&:first-child': {
      paddingLeft: 0,
      fontWeight: 600
    }
  }
}));

export const InpatientComponent = ({ inpatient }) => {
  const classes = useStyles();
  const [displayForm, setDisplayForm] = useState(false);

  const onValueChange = () => {
    setDisplayForm(!displayForm);
  };

  const renderDaysInAdmission = row => {
    return <>{moment().diff(moment(row.dateAdmitted), 'days')}</>;
  };

  const renderDateComponent = row => (
    <>{moment(row.createdAt).format('DD MMM, h:mm A')}</>
  );

  const inpatienttHeader = [
    { name: 'DATE ADMITTED', accessor: renderDateComponent },
    { name: 'ADMITTED BY', accessor: 'admittedBy' },
    { name: 'DAYS IN ADMISSION', accessor: renderDaysInAdmission },
    { name: 'ACTION', accessor: 'createdBy' }
  ];

  return (
    <Fragment>
      {inpatient.length < 1 && (
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
      )}
      {inpatient.length < 1 && displayForm && (
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
      {inpatient.length >= 1 && (
        <Grid container style={{ marginTop: 24 }}>
          <DataTable
            headers={inpatienttHeader}
            noBorder={true}
            data={inpatient}
            styles={classes}
          />
        </Grid>
      )}
    </Fragment>
  );
};
