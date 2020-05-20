import React from 'react';
import queue from 'images/icons/ic_queue.svg';
import dashboard from 'images/icons/ic_dashboard.svg';
import lab from 'images/icons/ic_lab.svg';
import kpi from 'images/icons/ic_kpi.svg';
import appointment from 'images/icons/ic_appointments.svg';
import setting from 'images/icons/ic_settings.svg';
import bedmanagement from 'images/icons/ic_admit_discharge.svg';
import contact from 'images/icons/ic_info.svg';
import lookup from 'images/icons/ic_search.svg';

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
