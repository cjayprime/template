import Immutable from 'immutable';
import { searchFilter } from 'bundles/kpi/selectors';
import { SORT_ENUM } from 'bundles/kpi/constants';

export const buildOrder = state => {
  let sortEnum = [SORT_ENUM];

  return sortEnum;
};

export const buildQuery = state => {
  let pgQuery = Immutable.Map({});

  const addOrClause = clause => {
    let presentList = pgQuery.get('or') || clause;

    if (presentList) {
      presentList = presentList.concat(clause);
    }

    pgQuery = pgQuery.set('or', presentList);
  };
   

  const addAndClause = clause => {
    let presentList = pgQuery.get('and') || clause;

    if (presentList) {
      presentList = presentList.concat(clause);
    }

    pgQuery = pgQuery.set('and', presentList);
  }

  const searchText = searchFilter.getSearchText(state);


  return pgQuery.toJS();
};