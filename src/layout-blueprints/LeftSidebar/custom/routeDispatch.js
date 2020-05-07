export const dispatchRouteFunc = (location, dispatch) => {
  if (location == '/Patient') {
    dispatch.setRouteTitleRedux('Patient');
    return;
  }

  if (location == '/CreatePatient') {
    dispatch.setRouteTitleRedux('CreatePatient');
    return;
  }

  if (location == '/Queue') {
    dispatch.setRouteTitleRedux('Queue');
    return;
  }

  if (location == '/Kpi') {
    dispatch.setRouteTitleRedux('Kpi');
    return;
  }

  if (location == '/Lab') {
    dispatch.setRouteTitleRedux('Lab');
    return;
  }

  if (location == '/BedManagement') {
    dispatch.setRouteTitleRedux('Location');
    return;
  }

  if(location == '/CreateTriage') {
    dispatch.setRouteTitleRedux('Triage');
    return
  }

  dispatch.setRouteTitleRedux('default');
};
