import mirrorCreator from 'mirror-creator';

export const actionTypes = mirrorCreator([
    'SEARCH_FILTERS_CLEAR_ALL',
    'ADD_SEARCH',
    'TOGGLE_FILTER',
    'ADD_USER',
    'LOGOUT',
    'ADD_ID'
], {prefix: 'STAFF_'});

export const SORT_ENUM = {
  firstName: ['FIRSTNAME_ASC']
};
