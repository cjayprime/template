import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { UPDATE_QUEUE } from 'graphql/mutations/Queue/UpdateQueue'; 
const compose = require('lodash').flowRight

const updateQueue = (WrappedComponent) => {
    const updateQueue = ({ updateQueue, ...props }) => {
        return (
            <WrappedComponent updateQueue={updateQueue} {...props} />
        )
    }
    const updateQueuePG = graphql(UPDATE_QUEUE, {
        name: 'updateQueue'
    })

    return compose(updateQueuePG)(updateQueue)
} 

export default updateQueue;