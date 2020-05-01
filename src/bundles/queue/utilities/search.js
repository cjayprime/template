import Immutable from 'immutable';
import { searchFilter } from 'bundles/queue/selectors/';
import { SORT_ENUM } from 'bundles/patient/constants';

export const buildOrder = (state) => {
    let sortEnum = [ SORT_ENUM ]

    return sortEnum;
}


export const buildQuery = (state) => {
    let pgQuery = Immutable.Map({
        team: Immutable.Map({
            equalTo:  "EVAC"
        })
    })

    return pgQuery.toJS();
}