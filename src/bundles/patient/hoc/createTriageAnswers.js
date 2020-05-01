import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { CREATE_TRIAGE_ANSWERS } from 'graphql/mutations/Patient/CreateTriageAnswers'; 
const compose = require('lodash').flowRight

const createTriangeAnswers = (WrappedComponent) => {

    const createTriangeAnswers = ({ createTriage, ...props }) => {

        return (
            <WrappedComponent createTriage={createTriage} {...props} />
        )
    }
    const createTriagePG = graphql(CREATE_TRIAGE_ANSWERS, {
        name: 'createTriage'
    })

    return compose(createTriagePG)(createTriangeAnswers)
}

export default createTriangeAnswers;
