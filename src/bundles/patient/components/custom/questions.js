export const QUESTIONS = [
  {
    title: 'Enter Patient details',
    content: [
      {
        label: 'First Name',
        placeholder: 'Enter First Name',
        type: 'text',
        key: 'firstname',
        required: true
      },
      {
        label: 'Last Name',
        placeholder: 'Enter Last Name',
        type: 'text',
        key: 'lastname',
        required: true
      },
      {
        label: 'Gender',
        type: 'radio',
        fields: ['MALE', 'FEMALE'],
        key: 'sex',
        required: true
      },
      {
        label: 'Date of Birth',
        type: 'date',
        fields: ['DD', 'MM', 'YYYY'],
        key: 'birthDate'
      }
    ]
  },
  {
    title: 'Contact information',
    content: [
      {
        label: 'Phone no.',
        type: 'phone',
        placeholder: 'Enter Phone Number',
        fields: ['+234'],
        key: 'phoneNumber',
        required: true
      },
      {
        label: 'Email',
        type: 'text',
        placeholder: 'Enter email',
        key: 'email'
      },
      {
        label: 'Address',
        type: 'text',
        placeholder: 'Street name',
        key: 'streetName'
      },
      {
        label: '',
        type: 'text',
        placeholder: 'Street name line 2',
        key: 'streetName2'
      },
      {
        label: 'City',
        type: 'text',
        placeholder: 'Enter city',
        key: 'city'
      },
      {
        label: 'State',
        type: 'select' ,
        placeholder: 'Choose from dropdown',
        fields: ['Lagos', 'Kogi', 'Abia'],
        key: 'state',
        required: true
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
        fields: ['Kosofe', 'Eti-Osa', 'Alimosho'],
        key: 'lga',
        required: true
      },
      {
        label: 'Country of residence',
        type: 'select',
        placeholder: 'Choose from dropdown',
        fields: ['Nigeria', 'England', 'Australia'],
        key: 'countryOfResidence'
      },
      {
        label: 'Nationality',
        type: 'select',
        placeholder: 'Choose from dropdown',
        fields: ['Nigeria', 'England', 'Australia'],
        key: 'nationality'
      },
      {
        label: 'Occupation',
        type: 'select',
        placeholder: 'Choose from dropdown',
        fields: ['Lawyer', 'Engineer', 'Doctor'],
        key: 'occupation'
      },
      {
        label: 'Other',
        placeholder: 'Write a note',
        type: 'textArea',
        key: 'notes'
      },
      {
        label: 'Location',
        type: 'text',
        placeholder: 'Enter location',
        key: 'location'
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
        fields: ['No queue', 'RRT', 'Pychosocial', 'Evac & Decon', 'EPID/Surveillance'],
        key: 'queue',
        required: true
      }
    ]
  }
];
