const triageQuestions = {
  Symptoms: [
    {
      question: 'Do you have a cough?',
      questionKey: 'cough',
      options: ['yes', 'no'],
      type: 'MULTI_TYPE',
      displayChildrenOn: 'yes',
      children: [
        {
          question: 'When did it start?',
          questionKey: 'coughOnset',
          type: 'DATE_TYPE'
        }
      ]
    },
    {
      question: 'Do you have a cold (watery catarrh i.e. runny nose)?',
      questionKey: 'runnyNose',
      options: ['yes', 'no'],
      type: 'MULTI_TYPE',
      displayChildrenOn: 'yes',
      children: [
        {
          question: 'When did it start?',
          questionKey: 'runnyNoseOnset',
          type: 'DATE_TYPE'
        }
      ]
    },
    {
      question: 'Do you have a headache?',
      questionKey: 'headache',
      options: ['yes', 'no'],
      type: 'MULTI_TYPE'
    },
    {
      question:
        'Do you have a diarrhea (passing loose watery stool more than thrice in a day)',
      questionKey: 'diarrhoea',
      options: ['yes', 'no'],
      type: 'MULTI_TYPE'
    },
    {
      question: 'Do you have a sore throat?',
      questionKey: 'soreThroat',
      options: ['yes', 'no'],
      type: 'MULTI_TYPE',
      displayChildrenOn: 'yes'
    },
    {
      question: 'Are you experiencing body aches?',
      questionKey: 'bodyAches',
      options: ['yes', 'no'],
      type: 'MULTI_TYPE',
      displayChildrenOn: 'yes'
    },
    {
      question: 'Do you have a high fever (very warm to touch)?',
      questionKey: 'fever',
      options: ['yes', 'no'],
      type: 'MULTI_TYPE',
      displayChildrenOn: 'yes',
      children: [
        {
          question: 'When did it start?',
          questionKey: 'feverOnset',
          type: 'DATE_TYPE'
        },
        {
          question: 'Specify max temperature?',
          questionKey: 'temparature',
          type: 'STRING_TYPE'
        }
      ]
    },
    {
      question: 'Are you experiencing fatigue?',
      questionKey: 'fatigue',
      options: ['yes', 'no'],
      type: 'MULTI_TYPE'
    },
    {
      question: 'Are you experiencing chest pains?',
      questionKey: 'chestPains',
      options: ['yes', 'no'],
      type: 'MULTI_TYPE'
    },
    {
      question: 'Are you having difficulty breathing?',
      questionKey: 'difficultyBreathing',
      options: ['yes', 'no'],
      type: 'MULTI_TYPE',
      displayChildrenOn: 'yes',
      children: [
        {
          question: 'When did it start?',
          questionKey: 'difficultyBreathingOnset',
          type: 'DATE_TYPE'
        }
      ]
    }
  ],
  Exposure: [
    {
      question: 'Do you have any travel history during the past 14 days?',
      questionKey: 'travelHistory',
      options: ['yes', 'no'],
      type: 'MULTI_TYPE',
      displayChildrenOn: 'yes',
      children: [
        {
          question: 'From',
          questionKey: 'travelHistoryFrom',
          type: 'DATE_TYPE'
        },
        { question: 'To', questionKey: 'travelHistoryTo', type: 'DATE_TYPE' },
        {
          question: 'Location',
          questionKey: 'travelHistoryState',
          type: 'SELECT_TYPE'
        },
        {
          question: 'City',
          questionKey: 'travelHistoryCity',
          type: 'SELECT_TYPE'
        },
        {
          question: 'LGA',
          questionKey: 'travelHistoryLga',
          type: 'SELECT_TYPE'
        }
      ]
    },
    {
      question: 'Do you have travel history to a COVID-19 Infected Area?',
      questionKey: 'covid19InfectedArea',
      options: ['yes', 'no'],
      type: 'MULTI_TYPE',
      displayChildrenOn: 'yes'
    },
    {
      question:
        'Have you had direct contact or are you taking care of a positive COVID-19 Patient?',
      questionKey: 'covid19Contact',
      options: ['yes', 'no'],
      type: 'MULTI_TYPE',
      displayChildrenOn: 'yes',
      children: [
        {
          question: 'Date of last contact',
          questionKey: 'covid19ContactDate',
          type: 'DATE_TYPE'
        }
      ]
    }
  ]
};

const triageQuestionWeights = {
  cough: 1,
  runnyNose: 1,
  headache: 1,
  diarrhoea: 1,
  soreThroat: 1,
  bodyAches: 1,
  fever: 2,
  fatigue: 2,
  chestPains: 4,
  difficultyBreathing: 6,
  travelHistory: 3,
  covid19InfectedArea: 6,
  covid19Contact: 10
};

export { triageQuestions, triageQuestionWeights };
