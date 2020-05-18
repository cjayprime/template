import Immutable from 'immutable';

const initialFilters = Immutable.Map({
  staff: {
    team: { isNull: false }
  }
});

const initialState = Immutable.Map({
  filters: initialFilters
});

export default (state = initialState, _) => state;
