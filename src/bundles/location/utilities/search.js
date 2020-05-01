import Immutable from 'immutable';
import { searchFilter } from 'bundles/location/selectors'; 
import { SORT_ENUM } from 'bundles/location/constants'; 

export const buildOrder = (state) => {
    let sortEnum = [ SORT_ENUM ]

    return sortEnum;
}

export const buildQuery = (state) => {
    let pgQuery = Immutable.Map({
        numberOfBeds: Immutable.Map({
            greaterThan:  0
        })
    })

    return pgQuery.toJS();
} 