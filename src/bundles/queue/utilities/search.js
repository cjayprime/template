import Immutable from 'immutable';
import { searchFilter } from 'bundles/queue/selectors/';
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
  };

  const teams = searchFilter.getTeam(state).toJS();

  if (teams.length ) {
    const hasTEAM = teams.map(data => {
      return Immutable.Map({
        team: Immutable.Map({
          equalTo: data
        })
      });
    });

    addOrClause(hasTEAM);
  }

  /*
    let pgQuery = Immutable.Map({
        team: Immutable.Map({
            equalTo:  "EVAC"
        })
    }) */

  return pgQuery.toJS();
};
