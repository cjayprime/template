export const SectionOneData = [
  {
    header: 'Samples Tested',
    value: '250',
    colors: {
      header: '#8DE2E4',
      caption: 'white'
    }
  },
  {
    header: 'Samples Collected Unique',
    value: '199',
    colors: {
      header: '#F5B7B1',
      caption: 'white'
    }
  },
  {
    header: 'Samples Tested',
    value: '91%',
    colors: {
      header: '#C39BD3',
      caption: 'white'
    }
  }
];

export const SectionThreeData = [
  {
    header: '91%',
    value: '24 Hr TAT this week',
    colors: {
      header: '#8DE2E4',
      caption: 'white'
    }
  },
  {
    header: '85%',
    value: 'Cummulative 24 Hr TAT',
    colors: {
      header: '#8DE2E4',
      caption: 'white'
    }
  }
];

const Legends = {
  dist: [
    { name: 'LUTH', color: '#F5B7B1' },
    { name: 'MEMR', color: '#FFEFD8' },
    { name: 'LSB', color: '#8DE2E4' }
  ],
  sample: [
    { name: 'Initial', color: '#F5B7B1' },
    { name: 'Follow up', color: '#FFEFD8' }
  ]
};

export const SectionTwoData = [
  {
    title: 'Sample testing by Lab',
    legend: {
      entries: Legends.dist,
      position: 'top',
      spacing: 4
    }
  },
  {
    title: 'Sample testing by initial follow up status',
    legend: {
      entries: Legends.sample,
      position: 'top',
      spacing: 4
    }
  }
];

export const SectionThreeChartData = [
  {
    title: 'Current Occupancy by ward',
    legend: {
      entries: Legends.dist,
      position: 'bottom',
      spacing: 4
    }
  },
  {
    title: 'CUMMULATIVE sample turn around',
    legend: {
      entries: Legends.sample,
      position: 'bottom',
      spacing: 4
    }
  }
];
