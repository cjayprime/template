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

export const PatientLabRequests = () => {
  const useStyle = makeStyles(() => ({
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
    },
    ActionButton: {
      color: '#EEBEC2',
      fontSize: 13,
      fontWeight: 'bold',
      padding: '5px 0'
    }
  }));
  const classes = useStyle();

  const renderActionComponent = row => (
    <Button className={classes.ActionButton}>View details</Button>
  );

  const labHeader = [
    { name: 'DATE REQUESTED.', accessor: 'requestDate' },
    { name: 'NAME OF TEST', accessor: 'testName' },
    { name: 'STATUS', accessor: 'status' },
    { name: 'RESULT', accessor: 'result' },
    { name: 'CREATED BY', accessor: 'createdBy' },
    { name: 'ACTION', accessor: renderActionComponent }
  ];

  const testLabStore = [
    {
      testName: 'SARS-CoV-2 RNA',
      status: 'Awaiting Sample',
      createdBy: 'Dr. G. Jenkins',
      result: '',
      requestDate: '31 Mar, 7:34PM'
    },
    {
      testName: 'SARS-CoV-2 RNA',
      status: 'Sample Collected',
      createdBy: 'Dr. G. Jenkins',
      result: '',
      requestDate: '31 Mar, 7:34PM'
    },
    {
      testName: 'SARS-CoV-2 RNA',
      status: 'Awaiting Result',
      createdBy: 'Dr. F. Cobb',
      result: '',
      requestDate: '31 Mar, 7:34PM'
    },
    {
      testName: 'SARS-CoV-2 RNA',
      status: 'Completed',
      createdBy: 'Dr. O. Alexander',
      result: 'positive',
      requestDate: '31 Mar, 7:34PM'
    }
  ];

  return (
    <DataTable
      headers={labHeader}
      noBorder={true}
      data={testLabStore}
      styles={classes}
    />
  );
};
