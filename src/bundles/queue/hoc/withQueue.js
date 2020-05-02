import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '@apollo/react-hoc';
import { ALL_QUEUES } from 'graphql/Queue/QueueData';
import {
    buildQuery, buildOrder
} from 'bundles/queue/utilities/search';
const compose = require('lodash').flowRight

const withQueue = (WrappedComponent) => {

    const withQueue = ({ allQueues , ...props}) => {

        if (allQueues.loading) return <div> Loading</div>

        let queues = []

        if (!allQueues.loading) {
            queues = allQueues.allQueues.nodes
        }


        return (
            <WrappedComponent queues={queues} {...props} />
        )
    }

    const withQueueData = graphql(ALL_QUEUES, {
        name: 'allQueues',
        options: ({ filter, orderBy, offset }) => ({
            variables: {
                filter,
                offset,
                orderBy
            }
        })
    })

    const mapStateToProps = (state) => {
        const filter = buildQuery(state);
        const orderBy = buildOrder(state);

        return {
            filter,
            orderBy
        }
    }

    return compose(connect(mapStateToProps), withQueueData)(withQueue)
}

export default withQueue;
