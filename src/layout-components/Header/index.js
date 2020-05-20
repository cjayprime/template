import React, { Fragment, useState } from 'react';

import clsx from 'clsx';

import { AppBar, Box, Typography, Grid, Button } from '@material-ui/core';

import { connect } from 'react-redux';

import {
  setSidebarToggle,
  setSidebarToggleMobile
} from '../../reducers/ThemeOptions';
import { toggleFilter as patientToggleFilter } from 'bundles/patient/actions';

import HeaderLogo from '../../layout-components/HeaderLogo';
import { useStyles } from 'layout-components/Header/custom/index.styles';
import caseIcon from 'images/icons/ic_records_case.svg';
import SearchField from 'layout-components/Header/custom/searchField';
import filterIcon from 'images/icons/ic_filter.svg';
import FilterToggler from 'layout-components/Header/custom/FilterDialog';

const Header = props => {
  const [filterState, setFilterState] = useState('');
  const [dialogShow, setDialogShow] = useState(false);
  const [selection, setSelection] = useState({});

  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };
  

  const dispatchAction = type => {
    if (
      !selection[props.routerType] ||
      !selection[props.routerType][filterState]
    )
      return;

    const data = selection[props.routerType][filterState];

    if (props.routerType == 'Patient') {
      const filterSelected = Object.keys(data).filter(key => {
        return data[key];
      });
      props.patientToggle(filterState, filterSelected);
    }

    setDialogShow(false); 
  };

  const setFilterFormat = data => {
    const type = props.routerType;

    const formattedSelection = Object.keys(data).reduce((acc, key) => {
      const value = data[key];

      if (acc[type] && acc[type][filterState]) {
        acc[type][filterState][key] = value;
      } else {
        acc[type] = { [filterState]: { [key]: value }, ...selection[type] };
      }

      return acc;
    }, selection);

    setSelection({ ...formattedSelection });
  };

  const showDialog = item => {
    setFilterState(item);
    setDialogShow(true);
  };

  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };

  // const resetFilters = () => {
  //   const type = props.routerType;
  //   if (selection[type] && selection[type][filterState]) { 
  //       delete selection[type][filterState]
  //       setSelection({ ...selection });
       
  //   }
  //   showDialog(false)
  // }

  const {
    headerShadow,
    headerFixed,
    sidebarToggleMobile,
    setSidebarToggleMobile,
    setSidebarToggle,
    sidebarToggle,
    router,
    routerType,
    patientToggle
  } = props;

  // Redirects can be configured here

  const config = router.get(routerType).toJS();
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar
        color="primary"
        className={clsx('app-header', {
          'app-header-collapsed-sidebar': props.isCollapsedLayout
        })}
        position={headerFixed ? 'fixed' : 'absolute'}
        elevation={0}>
        {!props.isCollapsedLayout && <HeaderLogo />}
        <Box className="app-header-toolbar">
          <Box className="d-flex align-items-center">
            <img src={caseIcon} width={20} height={20} />
            <Typography style={{ marginLeft: 24, fontSize: 20, color: '#231E1E' }}>
              {config.title}
            </Typography>
          </Box>
          <Box
            className={clsx(
              'd-flex align-items-center',
              classes.filterContainer
            )}>
            <Grid></Grid>
            <Grid container justify="flex-end" spacing={6}>
              {config.filters.map((item, index) => {
                const type =
                  selection[routerType] && selection[routerType][item];
                let found = false;

                if (type) {
                  const keyData = Object.keys(type);
                  for (let c = 0; c < keyData.length; c++) {
                    if (type[keyData[c]]) {
                      found = true;
                      break;
                    }
                  }
                }

                return (
                  <Fragment key={item}>
                    {' '}
                    <Button
                      className={
                        found
                          ? classes.filterSelected
                          : classes.filterNonSelected
                      }
                      onClick={() => showDialog(item)}>
                      <Typography key={`item-${item}`}>{item} </Typography>{' '}
                      <img
                        src={filterIcon}
                        key={`index-${item}`}
                        width="20"
                        height="20"
                      />{' '}
                    </Button>
                  </Fragment>
                );
              })}
            </Grid>
          </Box>
          <Box
            className={clsx(
              'd-flex align-items-center',
              classes.searchContainerDiv
            )}>
            {config.searchBox ? (
              <SearchField placeholder={config.placeholder} />
            ) : null}
          </Box>
        </Box>
      </AppBar>
      <FilterToggler
        open={dialogShow}
        title={`Filter By ${filterState}`}
        actionText={'Add'}
        cancelText={'Reset Filters'}
        dispatchClick={dispatchAction}
        type={filterState && filterState.split(' ').join('_')}
        handleClose={setDialogShow}
        setSelection={setFilterFormat}
        selection={selection}
        routerType={routerType}
      />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  router: state.router,
  routerType: state.ThemeOptions.routeTitle
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggle: enable => dispatch(setSidebarToggle(enable)),
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable)),
  patientToggle: (value, key) => dispatch(patientToggleFilter(value, key))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
