const Legends = {
  dist: [
    {
      name: 'Occupied',
      color: '#8EE2E5'
    },
    { name: 'Available', color: '#EEBEC2' }
  ],
  demo: [
    {
      name: 'Yes',
      color: '#8EE2E5'
    },
    { name: 'No', color: '#EEBEC2' }
  ],
  severity: [
    {
      name: 'Mild',
      color: '#FFEFD8'
    },
    { name: 'Moderate', color: '#EEBEC2' },
    { name: 'Severe', color: '#8DE3E5' }
  ]
};

export const SectionTwoRows = [
  {
    title: 'Current Occupancy',
    legend: {
      entries: Legends.dist,
      position: 'bottom',
      spacing: 6
    }
  },
  {
    title: 'Age',
    legend: {
      entries: Legends.dist,
      position: 'bottom',
      spacing: 6
    }
  },
  {
    title: 'Case/Contact',
    legend: {
      entries: Legends.dist,
      position: 'bottom',
      spacing: 6
    }
  },
  {
    title: 'Nationality',
    legend: {
      entries: Legends.dist,
      position: 'bottom',
      spacing: 6
    }
  },
  {
    title: 'Travel History',
    legend: {
      entries: Legends.dist,
      position: 'bottom',
      spacing: 4
    }
  }
];

export const SectionThreeRows = [
  {
    title: 'Current Occupancy by sex',
    legend: {
      entries: Legends.dist,
      position: 'bottom',
      spacing: 6
    }
  },
  {
    title: 'Duration of Admission (days) by sex'
  },
  {
    title: 'Ssverity symptoms on admission',
    legend: {
      entries: Legends.severity,
      position: 'bottom',
      spacing: 4
    }
  },
  {
    title: 'Symptoms on admission',
    legend: {
      entries: Legends.demo,
      position: 'bottom',
      spacing: 4
    }
  }
];
