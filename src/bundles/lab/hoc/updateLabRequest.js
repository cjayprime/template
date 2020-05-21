import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { UPDATE_LAB_REQUEST } from 'graphql/mutations/Lab/UpdateLabRequest'; 
const compose = require('lodash').flowRight

const updateLabRequest = (WrappedComponent) => {

    const updateLabRequest = ({ updateLabRequest, ...props }) => {

        return (
            <WrappedComponent updateLabRequest={updateLabRequest} {...props} />
        )
    }
    const updateLabRequestPG = graphql(UPDATE_LAB_REQUEST, {
        name: 'updateLabRequest'
    })

    return compose(updateLabRequestPG)(updateLabRequest)
}

export default updateLabRequest; 