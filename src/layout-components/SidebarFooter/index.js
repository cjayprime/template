import React, { Fragment } from 'react';
import {
  Box,
  MenuItem,
  Menu,
  Button,
  Typography,
  Avatar,
  Grid
} from '@material-ui/core';
import { logout, saveCurrentId } from 'bundles/setting/actions';
import * as searchFilter from 'bundles/setting/selectors';
import { signOut } from 'bundles/client/components/Apollo/Link/auth';
import { connect } from 'react-redux';
import { capitalizeFirstWord } from 'bundles/patient/components/custom/formBuilder';
function SidebarFooter({ logOutUser, saveId, user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const logoutDispatch = () => {
    saveId(-1);
    signOut();
    logOutUser(true);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Box className="app-sidebar-footer-wrapper">
        <div className="app-sidebar-footer">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={2}>
                <Avatar />
              </Grid>

              <Grid item xs={10}>
                <Typography
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    marginLeft: 13,
                    fontSize: 13
                  }}>
                  {user?.firstname
                    ? `${capitalizeFirstWord(user?.firstname)} ${capitalizeFirstWord(user?.lastname)}`
                    : null}
                </Typography>
              </Grid>
            </Grid>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem onClick={logoutDispatch}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>Change Profile Picture</MenuItem>
          </Menu>
        </div>
      </Box>
    </Fragment>
  );
}

const mapDispatchToProps = dispatch => ({
  logOutUser: value => dispatch(logout(value)),
  saveId: value => dispatch(saveCurrentId(value))
});

const mapStateToProps = state => ({
  user: searchFilter.getUser(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarFooter);
