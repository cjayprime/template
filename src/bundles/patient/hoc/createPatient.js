import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { CREATE_PATIENT } from 'graphql/mutations/Patient/CreatePatient'; 
const compose = require('lodash').flowRight

const createPatient = (WrappedComponent) => {

    const createPatient = ({ createPatient, ...props }) => {

        return (
            <WrappedComponent createPatientPG={createPatient} {...props} />
        )
    }
    const createPatientPG = graphql(CREATE_PATIENT, {
        name: 'createPatient'
    })

    return compose(createPatientPG)(createPatient)
}

export default createPatient;
