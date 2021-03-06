import mirrorCreator from 'mirror-creator';

export const actionTypes = mirrorCreator([
    'SEARCH_FILTERS_CLEAR_ALL',
    'ADD_SEARCH',
    'ADD_AVAILABLE_BED_LOCATION',
    'ADD_SELECTED_LOCATION'
], {prefix: 'LOCATION_'});

export const SORT_ENUM = {
    center: 'CENTER_ASC'
} 