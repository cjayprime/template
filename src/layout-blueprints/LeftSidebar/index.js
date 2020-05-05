import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { connect } from 'react-redux';

import { Sidebar, Header, Footer } from '../../layout-components';

const LeftSidebar = props => {
  const {
    children,
    sidebarToggle,
    sidebarFixed,
    footerFixed,
    contentBackground,
    showHeader,
    showFooter
  } = props;

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

export default connect(mapStateToProps)(LeftSidebar);
