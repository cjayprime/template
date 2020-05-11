import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { CREATE_LAB_REQUEST } from 'graphql/mutations/Lab/CreateLabRequest'; 
const compose = require('lodash').flowRight

const createLabRequest = (WrappedComponent) => {

    const createLabRequest = ({ createLabRequest, ...props }) => {

        return (
            <WrappedComponent createLabRequest={createLabRequest} {...props} />
        )
    }
    const createLabRequestPG = graphql(CREATE_LAB_REQUEST, {
        name: 'createLabRequest'
    })

    return compose(createLabRequestPG)(createLabRequest)
}

export default createLabRequest;