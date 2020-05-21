import React from 'react';
import queue from 'images/rectangle.png';
import dashboard from 'images/rectangle1.png';
import lab from 'images/rectangle3.png';
import kpi from 'images/rectangle5.png';
import appointment from 'images/rectangle6.png';
import setting from 'images/rectangle8.png';
import bedmanagement from 'images/rectangle7.png';
import dashboard2 from 'images/icon3.png';

const allowedViews = [
  {
    label: '',
    content: [
      {
        key: 'dashboard',
        label: 'Dashboard',
        icon: <img className="app-sidebar-icon" src={dashboard} />,
        to: '/Dashboard'
      },
      {
        key: 'patientProfile',
        label: 'Patient',
        icon: <img className="app-sidebar-icon" src={dashboard2} />,
        to: '/Patient'
      },
      {
        key: 'queues',
        label: 'Queue',
        icon: <img className="app-sidebar-icon" src={queue} />,
        to: '/Queue'
      },
      {
        label: 'KPI',
        icon: <img className="app-sidebar-icon" src={kpi} />,
        to: '/Kpi'
      },
      {
        key: 'appointments',
        label: 'Appointment',
        icon: <img className="app-sidebar-icon" src={appointment} />,
        to: '/Appointment'
      },
      {
        key: 'lab',
        label: 'Lab',
        icon: <img className="app-sidebar-icon" src={lab} />,
        to: '/Lab'
      },
      {
        label: 'Bed Management',
        icon: <img className="app-sidebar-icon" src={bedmanagement} />,
        to: '/BedManagement'
      },
      {
        label: 'Settings',
        key: 'settings',
        icon: <img className="app-sidebar-icon" src={setting} />,
        content: [
          {
            label: 'Location',
            description: 'Center location',
            to: '/Location'
          },
          {
            label: 'Staff',
            description: 'Staff',
            to: '/Staff'
          }
        ]
      }
    ]
  }
];

export default allowedViews;
