import Immutable from 'immutable';
import { searchFilter } from 'bundles/appointment/selectors';
import { SORT_ENUM } from 'bundles/patient/constants';

export const buildOrder = state => {
  let sortEnum = [SORT_ENUM];

  return sortEnum;
}; 

export const buildLabQuery = state => {

  let pgQuery = Immutable.Map({});

  const addOrClause = clause => {
    let presentList = pgQuery.get('or') || clause;

    if (presentList) {
      presentList = presentList.concat(clause);
    }

    pgQuery = pgQuery.set('or', presentList);
  };

  const status = searchFilter.getStatus(state);

  if(status.length) {
    
    const statusFilters = status.map((data) => {
      return Immutable.Map({
        'status': Immutable.Map({
          like: `%${data}%`
        })
      })
    })

    addOrClause(statusFilters);
  }

  return pgQuery.toJS();

}
 
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
          startsWithInsensitive: searchText
        })
      });
    });

   // addOrClause(startsWithFilters);

    const equalsToFilter = searchFields.map(data => {
      return Immutable.Map({
        [data]: Immutable.Map({
          equalTo: searchText
        })
      });
    });

    // addOrClause(equalsToFilter);
  }


  const status = searchFilter.getStatus(state);

  if(status.length) {
    
    const statusFilters = status.map((data) => {
      return Immutable.Map({
        'status': Immutable.Map({
          like: `%${data}%`
        })
      })
    })

    addOrClause(statusFilters);
  }




  return pgQuery.toJS();
};
