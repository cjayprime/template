import React from 'react';
import { makeStyles, Chip, Button } from '@material-ui/core';
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
    },
    AwaitingSample: {
      color: '#2C2E42',
      backgroundColor: '#FFEFD8'
    },
    SampleCollected: {
      color: '#2C2E42',
      backgroundColor: '#8EE2E5'
    },
    AwaitingResult: {
      color: '#2C2E42',
      backgroundColor: '#BDB8D9'
    },
    Completed: {
      color: '#fff',
      backgroundColor: '#2C2E42'
    }
  }));
  const classes = useStyle();

  const renderActionComponent = () => (
    <Button className={classes.ActionButton}>View details</Button>
  );

  const getChipClass = status => {
    switch (status) {
      case 'Awaiting Sample':
        return 'AwaitingSample';
      case 'Sample Collected':
        return 'SampleCollected';
      case 'Awaiting Result':
        return 'AwaitingResult';
      case 'Completed':
        return 'Completed';
      default:
        return '';
    }
  };

  const renderStatusComponent = row => (
    <Chip
      classes={{
        root: classes[getChipClass(row.status)]
      }}
      label={row.status}
      size="small"
    />
  );

  const labHeader = [
    { name: 'DATE REQUESTED.', accessor: 'requestDate' },
    { name: 'NAME OF TEST', accessor: 'testName' },
    { name: 'STATUS', accessor: renderStatusComponent },
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
