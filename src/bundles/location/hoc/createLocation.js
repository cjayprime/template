import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { CREATE_LOCATION } from 'graphql/mutations/Location/CreateLocation';  
const compose = require('lodash').flowRight

const createLocation = (WrappedComponent) => {

    const createLocation = ({ createLocation, ...props }) => {

        return (
            <WrappedComponent createLocation={createLocation} {...props} />
        )
    }
    const createLocationPG = graphql(CREATE_LOCATION, {
        name: 'createLocation'
    })

    return compose(createLocationPG)(createLocation)
}

export default createLocation; 
