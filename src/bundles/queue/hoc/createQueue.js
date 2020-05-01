import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { CREATE_QUEUE } from 'graphql/mutations/Queue/CreateQueue'; 
const compose = require('lodash').flowRight

const createQueue = (WrappedComponent) => {
    const createQueue = ({ createQueue, ...props }) => {
        return (
            <WrappedComponent addQueue={createQueue} {...props} />
        )
    }
    const createQueuePG = graphql(CREATE_QUEUE, {
        name: 'createQueue'
    })

    return compose(createQueuePG)(createQueue)
} 

export default createQueue;

