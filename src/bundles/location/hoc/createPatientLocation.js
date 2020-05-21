import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { CREATE_PATIENT_LOCATION } from 'graphql/mutations/Location/CreatePatientLocation';  
const compose = require('lodash').flowRight

const createPatientLocation = (WrappedComponent) => {

    const createPatientLocation = ({ createPatientLocation, ...props }) => {

        return (
            <WrappedComponent createPatientLocation={createPatientLocation} {...props} />
        )
    }
    const createPatientLocationPG = graphql(CREATE_PATIENT_LOCATION, {
        name: 'createPatientLocation'
    })

    return compose(createPatientLocationPG)(createPatientLocation)
}

export default createPatientLocation;  
