import mirrorCreator from 'mirror-creator';

export const actionTypes = mirrorCreator([
    'SEARCH_FILTERS_CLEAR_ALL',
    'ADD_SEARCH',
    'ADD_TYPE',
], {prefix: 'APPOINTMENT_'});

export const SORT_ENUM = {
    last: ''
}