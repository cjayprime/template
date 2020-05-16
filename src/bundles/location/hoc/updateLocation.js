import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { UPDATE_LOCATION } from 'graphql/mutations/Location/UpdateLocation';  
const compose = require('lodash').flowRight

const updateLocation = (WrappedComponent) => {

    const updateLocation = ({ updateLocation, ...props }) => {
        return (
            <WrappedComponent updateLocation={updateLocation} {...props} />
        )
    }
    const updateLocationPG = graphql(UPDATE_LOCATION, {
        name: 'updateLocation'
    })

    return compose(updateLocationPG)(updateLocation)
}

export default updateLocation;  