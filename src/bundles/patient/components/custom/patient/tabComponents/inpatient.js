import React, { Fragment, useState } from 'react';
import classnames from 'classnames';
import {
  Grid,
  makeStyles,
  OutlinedInput,
  FormControlLabel,
  Typography,
  Button,
  TextField,
  MenuItem
} from '@material-ui/core';
import { DataTable } from 'bundles/shared/components/Datatable';
import moment from 'moment';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

import { DefaultCheckbox } from 'bundles/patient/components/custom/formBuilder';
import { SelectTransform } from 'bundles/patient/components/custom/formBuilder';

const useStyles = makeStyles(theme => ({
  regLabelText: {
    fontSize: 15,
    color: '#231E1E'
  },
  LabelText: {
    fontSize: 13,
    color: '#231E1E',
    marginBottom: 9
  },
  formButton: {
    boxShadow: 'none',
    borderRadius: 20,
    textTransform: 'none',
    border: 'none',
    color: '#EFA14B',
    lineHeight: 1.5,
    fontSize: 16,
    padding: '10px 50px 10px'
  },
  formButtonTS: {
    color: '#FFF',
    backgroundColor: '#CB6A00',
    boxShadow:
      '0 6px 16px rgba(239, 161, 75, 0.20), 0 2px 10px rgba(239, 161, 75, 0.10)',
    '&:hover': {
      backgroundColor: '#CB6A00',
      border: 'none'
    },
    '&:active': {
      backgroundColor: '#CB6A00',
      border: 'none'
    }
  },
  input: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`
    },
    backgroundColor: '#E9E8E8',
    color: '#8F8D8C'
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
    color: '#231E1E'
  },
  Table: {
    backgroundColor: 'transparent'
  },
  HeaderTableCell: {
    color: '#8F8D8C',
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
  },
  select: {
    color: '#231E1E',
    backgroundColor: '#E8E6E6',
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
  ActionButton: {
    color: '#ED666B',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '5px 0'
  },
}));

const TransformIcon = () => <KeyboardArrowDown color="primary" />;

export const InpatientComponent = ({ inpatient }) => {
  const classes = useStyles();
  const [displayForm, setDisplayForm] = useState(false);
  const [patientAdmittanceData, setPatientAdmittanceData] = useState({});

  const onValueChange = () => {
    setDisplayForm(!displayForm);
  };

  const onPatientAdmittanceValueChange = (questionName, answerValue) => {
    setPatientAdmittanceData({
      ...patientAdmittanceData,
      [questionName]: answerValue
    });
  };

  const renderDaysInAdmission = row => {
    return <>{moment().diff(moment(row.dateAdmitted), 'days')}</>;
  };

  const renderDateComponent = row => (
    <>{moment(row.createdAt).format('DD MMM, h:mm A')}</>
  );

  const renderActionComponent = () => (
    <Button className={classes.ActionButton}>Discharge</Button>
  );

  const inpatientHeader = [
    { name: 'DATE ADMITTED', accessor: renderDateComponent },
    { name: 'ADMITTED BY', accessor: 'admittedBy' },
    { name: 'DAYS IN ADMISSION', accessor: renderDaysInAdmission },
    { name: 'ACTION', accessor: renderActionComponent }
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
                <TextField
                  select
                  fullWidth
                  onChange={e => onPatientAdmittanceValueChange('locationId', e.target.value)}
                  value={patientAdmittanceData['locationId']}
                  InputProps={{
                    className: classes.select
                  }}
                  SelectProps={{
                    native: false,
                    IconComponent: TransformIcon,
                    icon: classes.icon
                  }}
                  variant="outlined">
                  {['label'].map(option => (
                    <MenuItem
                      key={`${option}`}
                      value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
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
                  value={patientAdmittanceData['notes']}
                  multiline
                  rows={3}
                  onChange={e => onPatientAdmittanceValueChange('notes', e.target.value)}
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
            headers={inpatientHeader}
            noBorder={true}
            data={inpatient}
            styles={classes}
          />
        </Grid>
      )}
    </Fragment>
  );
};
