import React from 'react';
import { makeStyles, Chip, Button } from '@material-ui/core';
import { DataTable } from 'bundles/shared/components/Datatable';
import moment from 'moment';

export const PatientLabRequests = ({ labRequest }) => {
  const useStyle = makeStyles(() => ({
    Table: {
      backgroundColor: 'transparent'
    },
    HeaderTableCell: {
      color: '#685E5E',
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
      padding: 11,
      textTransform: 'capitalize',
      '&:first-child': {
        paddingLeft: 0,
        fontWeight: 600
      }
    },
    ActionButton: {
      color: '#ED666B',
      fontSize: 13,
      fontWeight: 'bold',
      padding: '5px 0'
    },
    AwaitingSample: {
      color: '#fff',
      backgroundColor: '#E4E4E4'
    },
    SampleCollected: {
      color: '#fff',
      backgroundColor: '#E4A35B'
    },
    AwaitingResult: {
      color: '#2C2E42',
      backgroundColor: '#516E22'
    },
    Completed: {
      color: '#fff',
      backgroundColor: '#3E3939'
    }
  }));
  const classes = useStyle();

  const renderActionComponent = () => (
    <Button className={classes.ActionButton}>View details</Button>
  );

  const getChipClass = status => {
    switch (status.toLowerCase()) {
      case 'awaiting sample':
        return 'AwaitingSample';
      case 'sample collected':
        return 'SampleCollected';
      case 'awaiting result':
        return 'AwaitingResult';
      case 'completed':
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

  const renderDateComponent = row => (
    <>{moment(row.requestDate).format('DD MMM, h:mm A')}</>
  );

  const labHeader = [
    { name: 'DATE REQUESTED.', accessor: renderDateComponent },
    { name: 'NAME OF TEST', accessor: 'testName' },
    { name: 'STATUS', accessor: renderStatusComponent },
    { name: 'RESULT', accessor: 'result' },
    { name: 'CREATED BY', accessor: 'requestedBy' },
    { name: 'ACTION', accessor: renderActionComponent }
  ];

  return (
    <DataTable
      headers={labHeader}
      noBorder={true}
      data={labRequest}
      styles={classes}
    />
  );
};
