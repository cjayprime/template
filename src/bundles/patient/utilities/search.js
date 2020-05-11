import Immutable from 'immutable';
import { searchFilter } from 'bundles/patient/selectors';
import { SORT_ENUM } from 'bundles/patient/constants';

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

  if (searchText) {
    const searchFields = [
      'firstname',
      'lastname',
      'phoneNumber',
      'email',
      'epidNumber'
    ];
    const startsWithFilters = searchFields.map(data => {
      return Immutable.Map({
        [data]: Immutable.Map({
          startsWith: searchText
        })
      });
    });

    addOrClause(startsWithFilters);

    const equalsToFilter = searchFields.map(data => {
      return Immutable.Map({
        [data]: Immutable.Map({
          equalTo: searchText
        })
      });
    });

    addOrClause(equalsToFilter);
  }

  const lga = searchFilter.getLGA(state);

  if (lga.length) {
    const hasLGA = lga.map((data) => {
      return Immutable.Map({
         'lga': Immutable.Map({
          equalTo: data
        })
      })
    })
    addOrClause(hasLGA)
  }


  console.log(pgQuery.toJS());

  return pgQuery.toJS();
};
