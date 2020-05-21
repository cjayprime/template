import Immutable from 'immutable';

const patientFilter = Immutable.Map({
  filters: Immutable.List([
    'TEAM',
    'LGA',
    'STATUS',
    'UNDERLYING ILLNESS',
    'TRAVEL HISTORY',
    'GENDER',
    'AGE'
  ]),
  title: 'Patients',
  icon: 'Patient',
  searchBox: false,
  dateFilter: true
});

const createPatientFilter = Immutable.Map({
  filters: Immutable.List([]),
  title: 'Register a new Patient',
  icon: 'RegisterPatient',
  searchBox: false,
  dateFilter: false
});

const queueFilter = Immutable.Map({
  filters: Immutable.List([
    'LGA',
    'STATUS',
    'UNDERLYING ILLNESS',
    'TRAVEL HISTORY',
    'GENDER',
    'AGE'
  ]),
  title: 'Queue',
  icon: 'Queue',
  searchBox: true,
  placeholder: 'Enter Search text',
  dateFilter: true
});

const kpiFilter = Immutable.Map({
  filters: Immutable.List([
    'LGA',
    'STATUS',
    'UNDERLYING ILLNESS',
    'TRAVEL HISTORY',
    'GENDER',
    'AGE'
  ]),
  title: 'Kpi',
  icon: 'Kpi',
  searchBox: true,
  placeholder: 'Enter Search text',
  dateFilter: false
});

const labFilter = Immutable.Map({
  filters: Immutable.List([
    'LGA',
    'STATUS',
    'UNDERLYING ILLNESS',
    'TRAVEL HISTORY',
    'GENDER',
    'AGE'
  ]),
  title: 'Lab Request',
  icon: 'Lab',
  searchBox: true,
  placeholder: 'Enter Specimen No',
  dateFilter: true
});

const locationFilter = Immutable.Map({
  filters: Immutable.List([
    'LGA',
    'TRAVEL HISTORY',
    'GENDER',
  ]),
  title: 'Location',
  icon: 'Location',
  searchBox: true,
  placeholder: 'Enter Location name',
  dateFilter: false
});

const triageFilter = Immutable.Map({
  filters: Immutable.List([
  ]),
  title: 'Fill In Triage',
  icon: '',
  searchBox: false,
  placeholder: 'Enter Location name',
  dateFilter: true
}); 


const defaultFilter = Immutable.Map({
  filters: Immutable.List([
    'TEAM',
    'LGA',
    'STATUS',
    'UNDERLYING ILLNESS',
    'TRAVEL HISTORY',
    'GENDER',
    'AGE'
  ]),
  title: '',
  icon: '',
  searchBox: false,
  placeholder: '',
  dateFilter: true
});

const initialState = Immutable.Map({
  'Patient': patientFilter,
  'CreatePatient': createPatientFilter,
  'Queue': queueFilter,
  'Kpi': kpiFilter,
  'Lab': labFilter,
  'Location': locationFilter,
   'Triage':triageFilter,
  'default': defaultFilter
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

/*
const handleAddSearch = (state, action) => {
  const { value } = action.payload;
  return state.setIn(['searchFilters', 'searchText'], value);
};

const handleClearAllSearch = (state, action) => {
  return state.set('searchFilters', initialSearchFilters);
}; */

export default reducer;
