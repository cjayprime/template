import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import {
  setRouteTitle,
  setShowFooter,
  setShowHeader 
} from 'reducers/ThemeOptions';
import withQueueHoc  from 'bundles/subscription/hoc/withQueueSubscription'
import { dispatchRouteFunc } from 'layout-blueprints/LeftSidebar/custom/routeDispatch';
import { Sidebar, Header, Footer } from '../../layout-components';

const LeftSidebar = props => {
  const {
    children,
    sidebarToggle,
    sidebarFixed,
    footerFixed,
    contentBackground,
    showHeader,
    showFooter,
    setShowHeaderRedux,
    setShowFooterRedux,
    setRouteTitleRedux
  } = props;

  const publishRoute = location => {
    dispatchRouteFunc(location, { setShowHeaderRedux, setShowFooterRedux, setRouteTitleRedux });
  };

  props.history.listen((location, action) => {
    publishRoute(location.pathname);
    console.log('on route change', location, action);
  });
  
  const data = withQueueHoc();

  console.log(data, 'Was triggered')

  return (
    <Fragment>
      <div className={clsx('app-wrapper', contentBackground)}>
        {true ? <Header /> : null}
        <div
          className={clsx('app-main', {
            'app-main-sidebar-static': !sidebarFixed
          })}>
          <Sidebar />
          <div
            className={clsx('app-content', {
              'app-content-sidebar-collapsed': sidebarToggle,
              'app-content-sidebar-fixed': sidebarFixed,
              'app-content-footer-fixed': footerFixed
            })}>
            <div className="app-content--inner">
              <div className="app-content--inner__wrapper">{children}</div>
            </div>
            {showFooter ? <Footer /> : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

LeftSidebar.propTypes = {
  children: PropTypes.node
};

const mapDispatchToProps = dispatch => ({
  setShowFooterRedux: value => dispatch(setShowFooter(value)),
  setShowHeaderRedux: value => dispatch(setShowHeader(value)),
  setRouteTitleRedux: value => dispatch(setRouteTitle(value))
  // setDispatchFunc: value => dispatch(setDispatchFunction(value))
});

const mapStateToProps = state => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  sidebarFixed: state.ThemeOptions.sidebarFixed,
  showHeader: state.ThemeOptions.showHeader,
  headerFixed: state.ThemeOptions.headerFixed,
  headerSearchHover: state.ThemeOptions.headerSearchHover,
  headerDrawerToggle: state.ThemeOptions.headerDrawerToggle,
  showFooter: state.ThemeOptions.showFooter,
  footerFixed: state.ThemeOptions.footerFixed,
  contentBackground: state.ThemeOptions.contentBackground
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);
