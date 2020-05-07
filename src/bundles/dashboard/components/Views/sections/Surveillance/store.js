export const recentCases = [
  {
    title: 'Today',
    entries: {
      'Confirmed Cases': 1500,
      Discharged: 1500,
      Deaths: 200
    }
  },
  {
    title: 'Cummulative',
    entries: {
      'Confirmed Cases': 1500,
      Discharged: 1500,
      Deaths: 200,
      Active: 11
    }
  }
];

export const Legends = {
  epidCurve: [
    { name: 'Active', color: '#8EE2E5' },
    { name: 'Deaths', color: '#FF5B67' }
  ],
  gender: [
    {
      name: 'Male',
      color: '#8EE2E5'
    },
    { name: 'Female', color: '#EEBEC2' }
  ]
};

export const SectionTwoRows = [
  {
    title: 'Gender',
    legend: {
      entries: Legends.gender,
      position: 'bottom',
      spacing: 6
    }
  }
];
