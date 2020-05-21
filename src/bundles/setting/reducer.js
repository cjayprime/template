import Immutable from 'immutable';
import { actionTypes } from './constants';

const initialSearchFilters = Immutable.Map({
  staff: {
    team: { isNull: false }
  },
  searchText: '',
});

const initialState = Immutable.Map({
  filters: initialSearchFilters,
  id: -1,
  user: {},
  logout: false
});  


const reducer = (state = initialState, action) => {
  switch (action.type) {

      case actionTypes.ADD_ID:
        return handleId(state, action)

      case actionTypes.ADD_USER:
        return handleAddUser(state, action)

      case actionTypes.LOGOUT:
        return handleLogout(state, action)

      case actionTypes.SEARCH_FILTERS_CLEAR_ALL:
          return handleClearAllSearch(state, action);

      case actionTypes.ADD_SEARCH:
          return handleAddSearch(state, action);

      default:
          return state;
  }
}

const handleAddUser = (state, action) => {
  const { value } = action.payload;
  return state.set('user', value);
}

const handleLogout = (state, action) => {
  const { value } = action.payload;

  return state.set('logout', value);
}

const handleId = (state, action) => {
  const { value } = action.payload;
  return state.set('id', value);
} 

const handleAddSearch = (state, action) => {
  const { value } = action.payload;

  return state.setIn(['filters', 'searchText'], value);
}

const handleClearAllSearch = (state, action) => {
  return state.set('filters', initialSearchFilters);
}

export default reducer;
