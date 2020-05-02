export const QUESTIONS = [
  {
    title: 'Enter Patient details',
    content: [
      {
        label: 'First Name',
        placeholder: 'Enter First Name',
        type: 'text'
      },
      {
        label: 'Last Name',
        placeholder: 'Enter Last Name',
        type: 'text'
      },
      {
        label: 'Gender',
        type: 'radio',
        fields: ['male', 'female']
      },
      {
        label: 'Date of Birth',
        type: 'date',
        fields: ['MM', 'MM', 'YYYY']
      }
    ]
  },
  {
    title: 'Contact information',
    content: [
      {
        label: 'Phone no.',
        type: 'phone',
        placeholder: ['000', 'Enter Phone Number']
      },
      {
        label: 'Email',
        type: 'text',
        placeholder: 'Enter email',
      },
      {
        label: 'Address',
        type: 'text',
        placeholder: 'Street name'
      },
      {
        label: '',
        type: 'text',
        placeholder: 'Street name line 2'
      },
      {
        label: 'City',
        type: 'text',
        placeholder: 'Enter city'
      },
      {
        label: 'State',
        type: 'select' ,
        placeholder: 'Choose from dropdown',
        fields: ['Lagos', 'Kogi', 'Abia']
      }
    ]
  },

  {
    title: 'Other',
    content: [
      {
        label: 'LGA',
        type: 'select',
        placeholder: 'Choose from dropdown',
        fields: ['Kosofe', 'Eti-Osa', 'Alimosho']
      },
      {
        label: 'Country of residence',
        type: 'select',
        placeholder: 'Choose from dropdown',
        fields: ['Nigeria', 'England', 'Australia']
      },
      {
        label: 'Nationality',
        type: 'select',
        placeholder: 'Choose from dropdown',
        fields: ['Nigeria', 'England', 'Australia']
      },
      {
        label: 'Occupation',
        type: 'select',
        placeholder: 'Choose from dropdown',
        fields: ['Lawyer', 'Engineer', 'Doctor']
      },
      {
        label: 'Other',
        placeholder: 'Write a note',
        type: 'textArea'
      },
      {
        label: 'Location',
        type: 'text',
        placeholder: 'Enter location'
      },
    ],
  },
  {
    title: 'Forward to queue',
    content: [
      {
        label: 'Queue',
        type: 'select',
        placeholder: 'No queue',
        fields: ['No queue', 'RRT', 'Pychosocial', 'Evac & Decon', 'EPID/Surveillance']
      }
    ]
  }
];
