import Immutable from 'immutable';
import { actionTypes } from './constants';

const initialSearchFilters = Immutable.Map({
  searchText: ''
});

const initialState = Immutable.Map({
  searchFilters: initialSearchFilters,
  availableBedLocation: Immutable.List([])
}); 
 
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_FILTERS_CLEAR_ALL:
      return handleClearAllSearch(state, action);

    case actionTypes.ADD_SEARCH:
      return handleAddSearch(state, action);

    case actionTypes.ADD_AVAILABLE_BED_LOCATION:
      return handleAvailableBedLocation(state, action)

    default:
      return state;
  }
};

const handleAvailableBedLocation = (state, action) => {
  const { value } = action.payload
  return state.set('availableBedLocation', value)
} 
 
const handleAddSearch = (state, action) => {
  const { value } = action.payload;
  return state.setIn(['searchFilters', 'searchText'], value);
};

const handleClearAllSearch = (state, action) => {
  return state.set('searchFilters', initialSearchFilters);
};

export default reducer;
