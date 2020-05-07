export const LGA = () => {
  return [
    {
      title: '',
      content: [
        {
          label: 'Eti Osa',
          placeholder: 'Enter First Name',
          type: 'checkbox',
          key: 'Eti-Osa',
          required: true
        },
        {
          label: 'Lagos Island',
          placeholder: 'Enter First Name',
          type: 'checkbox',
          key: 'Lagos Island',
          required: true
        },
        {
          label: 'Agege',
          placeholder: 'Enter First Name',
          type: 'checkbox',
          key: 'Agege',
          required: true
        },
        {
          label: 'Ikeja',
          placeholder: 'Enter First Name',
          type: 'checkbox',
          key: 'Ikeja',
          required: true
        },
        {
          label: 'Kosofe',
          placeholder: 'Enter First Name',
          type: 'checkbox',
          key: 'Kosofe',
          required: true
        }
      ]
    }
  ];
};

export const TEAM = () => {
  return [
    {
      title: '',
      content: [
        {
          label: 'RRT',
          type: 'checkbox',
          key: 'RRT',
          required: false
        },
        {
          label: 'Pychosocial',
          type: 'checkbox',
          key: 'Pychosocial',
          required: false
        },
        {
          label: 'Evac & Decon',
          type: 'checkbox',
          key: 'Evac & Decon',
          required: false
        },
        {
          label: 'EPID/Surveillance',
          type: 'checkbox',
          key: 'EPID/Surveillance',
          required: false
        }
      ]
    }
  ];
};

export const STATUS = () => {
  return [
    {
      title: '',
      content: [
        {
          label: 'High Risk',
          type: 'checkbox',
          key: 'High Risk',
          required: false
        },
        {
          label: 'Low Risk',
          type: 'checkbox',
          key: 'Low Risk',
          required: false
        },
        {
          label: 'No Risk',
          type: 'checkbox',
          key: 'No Risk',
          required: false
        },
        {
          label: 'Sample Collected',
          type: 'checkbox',
          key: 'Sample Collected',
          required: false
        },
      ]
    }
  ]
}

export const GENDER = () => {
  return [
    {
      title: '',
      content: [
        {
          label: 'Male',
          type: 'checkbox',
          key: 'MALE',
          required: false
        },
        {
          label: 'Female',
          type: 'checkbox',
          key: 'FEMALE',
          required: false
        }

      ]
    }
  ]
}

export const AGE = () => {
  return [
    {
      title: '',
      content: [
        {
          label: '25 years and below',
          type: 'checkbox',
          key: '25',
          required: false
        },
        {
          label: '40 years and below',
          type: 'checkbox',
          key: '40',
          required: false
        },
        {
          label: '70 years and below',
          type: 'checkbox',
          key: '70',
          required: false
        },
        {
          label: '90 years and below',
          type: 'checkbox',
          key: '90',
          required: false
        }
      ]
    }
  ]
}

export const TRAVEL_HISTORY = () => {
  return [
    {
      title: '',
      content: [
        {
          label: 'England',
          type: 'checkbox',
          key: 'england',
          required: false
        },
        {
          label: 'China',
          type: 'checkbox',
          key: 'china',
          required: false
        },
        {
          label: 'Germany',
          type: 'checkbox',
          key: 'germany',
          required: false
        },
        {
          label: 'South Africa',
          type: 'checkbox',
          key: 'southafrica',
          required: false
        }
      ]
    }
  ]
}

export const UNDERLYING_ILLNESS = () => {
  return [
    {
      title: '',
      content: [
        {
          "label": "Pregnancy",
          "key": "pregnancy",
          "type": "checkbox"
        },
        {
          "label": "Obesity",
          "key": "obesity",
          "type": "checkbox"
        },
        {
          "label": "Cancer",
          "key": "cancer",
          "type": "checkbox"
        },
        {
          "label": "Diabetes HIV/other Immune deficiency",
          "key": "diabetes",
          "type": "checkbox"
        },
        {
          "label": "Heart Disease",
          "key": "heartDisease",
          "type": "checkbox"
        },
        {
          "label": "Asthma",
          "key": "asthma",
          "type": "checkbox"
        },
        {
          "label": "Chronic Lung Disease",
          "key": "lungDisease",
          "type": "checkbox"
        },
        {
          "label": "Chronic Liver Disease",
          "key": "liverDisease",
          "type": "checkbox"
        },
        {
          "label": "Chronic Haematological Disorder",
          "key": "haematologicalDisorder",
          "type": "checkbox"
        },
        {
          "label": "Chronic Kidney Disease",
          "questionKey": "kidneyDisease",
          "options": ["yes", "no", "Unknown"],
          "type": "checkbox"
        },
        {
          "label": "Chronic neurological impairment/disease",
          "key": "neurologicalDisease",
          "type": "checkbox"
        },
        {
          "label": "Organ/bone marrow recipient",
          "key": "organRecipient",
          "type": "checkbox"
        },
        {
          "label": "Other",
          "key": "otherPreExistingConditions",
          "type": "checkbox"
        },
        {
          "label": "Other",
          "key": "otherPreExistingConditions",
          "type": "checkbox"
        }
      ]
    }
  ]
}
