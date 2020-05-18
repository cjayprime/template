import React from 'react';
import queue from 'images/rectangle.png';
import dashboard from 'images/rectangle1.png';
import lab from 'images/rectangle3.png';
import kpi from 'images/rectangle5.png';
import appointment from 'images/rectangle6.png';
import setting from 'images/rectangle8.png';
import bedmanagement from 'images/rectangle7.png';
import dashboard2 from 'images/icon3.png';
import Icon from '@material-ui/core/Icon';

const allowedViews = [
  {
    label: '',
    content: [
      {
        key: 'dashboard',
        label: 'Dashboard',
        icon: <Icon className="fas fa-chart-pie" style={{color: '#E4A35B', fontSize: 18, marginRight: 20}} />,
        to: '/Dashboard'
      },
      {
        key: 'patientProfile',
        label: 'Patient',
        icon: <Icon className="fas fa-search" style={{color: '#E4A35B', fontSize: 18, marginRight: 20}} />,
        to: "/Patient"
      },
      {
        key: 'queues',
        label: 'Queue',
        icon: <Icon className="fas fa-th-list" style={{color: '#E4A35B', fontSize: 18, marginRight: 20}} />,
        to: "/Queue"
      },
      {
        key: 'kpi',
        label: 'KPI',
        icon: <Icon className="fas fa-user-tie" style={{color: '#E4A35B', fontSize: 18, marginRight: 20}} />,
        to: "/Kpi"
      },
      {
        key: 'appointments',
        label: 'Appointment',
        icon: <Icon className="fas fa-calendar-day" style={{color: '#E4A35B', fontSize: 18, marginRight: 20}} />,
        to: "/Appointment"
      },
      {
        key: 'lab',
        label: 'Lab',
        icon: <Icon className="fas fa-flask" style={{color: '#E4A35B', fontSize: 18, marginRight: 20}} />,
        to: "/Lab"
      },
      {
        key: 'bedManagement',
        label: 'Bed Management',
        icon: <Icon className="fas fa-bed" style={{color: '#E4A35B', fontSize: 18, marginRight: 20}} />,
        to: "/BedManagement"
      },
      {
        label: 'Settings',
        // key: 'settings',
        icon: <Icon className="fas fa-sliders-h" style={{color: '#E4A35B', fontSize: 18, marginRight: 20}} />,
        content: [
          {
            // key: 'location',
            label: 'Location',
            description: 'Center location',
            to: '/Location'
          },
          {
            // key: 'staff',
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
