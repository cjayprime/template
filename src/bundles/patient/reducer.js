import Immutable from 'immutable';
import { actionTypes } from './constants';

const initialSearchFilters = Immutable.Map({
  searchText: 'a',
  LGA: Immutable.List([]),
  TEAM: Immutable.List([]),
  STATUS: Immutable.List([]),
  UNDERLYING_ILLNESS: Immutable.List([]),
  TRAVEL_HISTORY: Immutable.List([]),
  GENDER: Immutable.List([]),
  AGE: Immutable.List([])
});

const initialState = Immutable.Map({
  searchFilters: initialSearchFilters,
  currentPatient: null,
}); 

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_FILTERS_CLEAR_ALL:
      return handleClearAllSearch(state, action);

    case actionTypes.CURRENT_PATIENT:
      return handleCurrentPatient(state, action);

    case actionTypes.ADD_SEARCH:
      return handleAddSearch(state, action);

    case actionTypes.TOGGLE_FILTER:
        return toggleFilter(state, action);

    default:
      return state;
  }
};

const handleAddSearch = (state, action) => {
  const { value } = action.payload;
  return state.setIn(['searchFilters', 'searchText'], value);
};

const handleCurrentPatient = (state, action) => {
  const { value } = action.payload;
  console.log(value, 'Here we go bitch')
  return state.set('currentPatient', value);
}

const handleClearAllSearch = (state, action) => {
  return state.set('searchFilters', initialSearchFilters);
};

const toggleFilter = (state, action) => {
    const { key, value } = action.payload;
    return state.setIn(['searchFilters', key], value)
}

export default reducer;
