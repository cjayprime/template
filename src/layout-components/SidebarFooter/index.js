import React, { Fragment } from 'react';

import { IconButton, Box, Tooltip, Typography } from '@material-ui/core';

import { Bell, Activity, Briefcase, Calendar } from 'react-feather';

export default function SidebarFooter() {
  return (
    <Fragment>
      <Box className="app-sidebar-footer-wrapper">
        <div className="app-sidebar-footer">
         <Typography>Logged as call center</Typography>
        </div>
      </Box>
    </Fragment>
  );
}
