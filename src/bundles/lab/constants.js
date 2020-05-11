import mirrorCreator from 'mirror-creator';

export const actionTypes = mirrorCreator([
    'SEARCH_FILTERS_CLEAR_ALL',
    'ADD_SEARCH',
    'TOGGLE_FILTER'
], {prefix: 'LAB_'});

export const SORT_ENUM = {
    last: ''
}