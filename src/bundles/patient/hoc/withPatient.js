import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '@apollo/react-hoc';
import { ALL_PATIENTS } from 'graphql/Patient/PatientData.js';
import {
    buildQuery, buildOrder
} from 'bundles/patient/utilities/search';

const compose = require('lodash').flowRight

const withPatient = (WrappedComponent) => {

    const withPatients = ({ allPatients , ...props}) => {

        if (allPatients.loading) return <div> Loading</div>

        let patients = []

        if (!allPatients.loading) {
            patients = allPatients.allPatients.nodes
        }


        return (
            <WrappedComponent patients={patients} {...props} />
        )
    }

    const withPatientData = graphql(ALL_PATIENTS, {
        name: 'allPatients',
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

    return compose(connect(mapStateToProps), withPatientData)(withPatients)
}

export default withPatient;
