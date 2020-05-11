import React from 'react';
import { makeStyles, Chip } from '@material-ui/core';
import { DataTable } from 'bundles/shared/components/Datatable';

export const PatientAppointment = () => {
  const useStyle = makeStyles(() => ({
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
    },
    AwaitingSamplePicup: {
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

  const getChipClass = status => {
    switch (status) {
      case 'Awaiting Sample Pickup':
        return 'AwaitingSamplePicup';
      case 'Awaiting Pickup':
        return 'AwaitingPickup';
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

  const testAppointmentStore = [
    {
      scheduledAt: '31 Mar, 3:00 PM',
      createdBy: 'Vincent Simpson',
      team: 'RRT',
      status: 'Awaiting Sample Pickup'
    },
    {
      scheduledAt: '31 Mar, 3:00 PM',
      createdBy: 'Lucas Cruz',
      team: 'Evac & Decon',
      status: 'Awaiting Pickup'
    },
    {
      scheduledAt: '31 Mar, 3:00 PM',
      createdBy: 'Barbara Norris',
      team: 'EPID',
      status: 'Completed'
    }
  ];

  const appointmentHeader = [
    { name: 'DATE', accessor: 'scheduledAt' },
    { name: 'TEAM', accessor: 'team' },
    { name: 'STATUS', accessor: renderStatusComponent },
    { name: 'CREATED BY', accessor: 'createdBy' }
  ];

  return (
    <DataTable
      headers={appointmentHeader}
      noBorder={true}
      data={testAppointmentStore}
      styles={classes}
    />
  );
};
