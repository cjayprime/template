import Immutable from 'immutable';
import { actionTypes } from './constants';

const initialSearchFilters = Immutable.Map({
    searchText: 'a'
});
 
const initialState = Immutable.Map({
    searchFilters: initialSearchFilters
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_FILTERS_CLEAR_ALL:
            return handleClearAllSearch(state, action);

        case actionTypes.ADD_SEARCH:
            return handleAddSearch(state, action);

        default:
            return state;

    }
}
 
const handleAddSearch = (state, action) => {
    const { value } = action.payload;
    
    console.log('Search...', value)
    return state.setIn(['searchFilters', 'searchText'], value)
}

const handleClearAllSearch = (state, action) => {
    return state.set('searchFilters', initialSearchFilters)
}

export default reducer;

