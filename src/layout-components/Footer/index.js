import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Paper, Typography,Box } from '@material-ui/core';
import { connect } from 'react-redux';

const Footer = props => {
  const { footerShadow, sidebarToggle, footerFixed } = props;
  return (
    <Fragment>
      <Paper
        square
        elevation={footerShadow ? 11 : 2}
        className={clsx('app-footer text-black-50', {
          'app-footer--fixed': footerFixed,
          'app-footer--fixed__collapsed': sidebarToggle
        })}>
          <div className="app-footer--inner">
          <div className="app-footer--first">
            {/* <List dense className="d-flex align-items-center">
              <ListItem
                className="rounded-sm text-nowrap"
                button
                component={Link}
                to="/DashboardAnalytics">
                <ListItemText primary="Analytics" />
              </ListItem>
              <ListItem
                className="rounded-sm text-nowrap"
                button
                component={Link}
                to="/FormsWizard">
                <ListItemText primary="Wizards" />
              </ListItem>
              <ListItem
                className="rounded-sm text-nowrap"
                button
                component={Link}
                to="/DashboardCrmManager">
                <ListItemText primary="CRM Manager" />
              </ListItem>
            </List> */}
          </div> 
          <div style={{color: '#fff'}} className="app-footer--second">
            <span style={{color: '#fff'}}>Lasphers</span> ©
            2020 - crafted  by{' '} helium
          
          </div>
        </div>
          
        {/*<RegisterPatient classes={classes} func={props.dispatchFunc} /> */}
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  footerFixed: state.ThemeOptions.footerFixed,
  footerShadow: state.ThemeOptions.footerShadow,
  //dispatchFunc: state.ThemeOptions.dispatchFunc,
  sidebarToggle: state.ThemeOptions.sidebarToggle
});
export default connect(mapStateToProps)(Footer);
