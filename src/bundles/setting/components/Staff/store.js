import React from 'react';
import queue from 'images/rectangle.png';
import dashboard from 'images/rectangle1.png';
import lab from 'images/rectangle3.png';
import kpi from 'images/rectangle5.png';
import appointment from 'images/rectangle6.png';
import setting from 'images/rectangle8.png';
import bedmanagement from 'images/rectangle7.png';
import contact from 'images/triageinfo.png';
import lookup from 'images/icon3.png';

export const accessLevelIconMap = {
  lab: <img src={lab} />,
  appointments: <img src={appointment} />,
  dashboard: <img src={dashboard} />,
  admitDischarge: <img src={bedmanagement} />,
  reports: <img src={kpi} />,
  queues: <img src={queue} />,
  contactInfo: <img src={contact} />,
  notes: <img src={lookup} />,
  patientProfile: <img src={setting} />
};

export const accessLevels = [
  {
    field: 'Laboratory',
    key: 'lab',
    icon: accessLevelIconMap.lab,
    children: ['View', 'Receive Specimen', 'Take Specimen', 'Fill Result']
  },
  { field: 'Log Call', icon: accessLevelIconMap.logCall, key: 'logCall' },
  {
    field: 'Contact Information',
    icon: accessLevelIconMap.contactInfo,
    key: 'contactInfo'
  },
  {
    field: 'Patient profile',
    icon: accessLevelIconMap['patientProfile'],
    key: 'patientProfile'
  },
  { field: 'Notes', icon: accessLevelIconMap['notes'], key: 'notes' },
  { field: 'Queues', icon: accessLevelIconMap.queues, key: 'queues' },
  {
    field: 'Appointments',
    icon: accessLevelIconMap['appointments'],
    children: ['View', 'Create'],
    key: 'appointments'
  },
  { field: 'Dashboard', icon: accessLevelIconMap.dashboard, key: 'dashboard' },
  { field: 'Reports', icon: accessLevelIconMap.reports, key: 'reports' },
  {
    field: 'Admit/Discharge',
    icon: accessLevelIconMap.admitDischarge,
    key: 'admitDischarge'
  },
  {
    field: 'Create Triage',
    icon: accessLevelIconMap.dashboard,
    key: 'createTriage'
  },
  { field: 'Settings', icon: accessLevelIconMap.dashboard, key: 'settings' },
  {
    field: 'Bed Managemnt',
    icon: accessLevelIconMap.dashboard,
    key: 'bedManagement'
  },
  { field: 'KPI', icon: accessLevelIconMap.dashboard, key: 'kpi' },
  { field: 'Staff', icon: accessLevelIconMap.dashboard, key: 'staff' },
  { field: 'Locationss', icon: accessLevelIconMap.dashboard, key: 'location' }
];
