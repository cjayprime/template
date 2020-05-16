import React, { useState, Fragment } from 'react';
import { Container, Grid, Typography, Avatar } from '@material-ui/core';
import { withStaff } from 'bundles/setting/hoc';
import { flowRight as compose } from 'lodash';
import clsx from 'clsx';
import img from 'images/rectangle.png';
import { Header, DataTable } from 'bundles/shared/components';
import { StaffPageStyles } from './index.style.js';
import { accessLevels, accessLevelIconMap } from './store';
import { CreateStaff } from './components/Create';

const Staff = props => {
  const [editState, setEditState] = useState(false);
  const classes = StaffPageStyles();

  const renderAvatar = props => (
    <Avatar
      className={classes.Avatar}
      src={props.profilePictureUrl}
      alt={`${props.firstName}-profile-picture`}
    />
  );
  const renderAccessLevel = props => {
    const nodes = { ...props.accessLevel };
    delete nodes['__typename'];
    return (
      <Grid container>
        {Object.entries(nodes).map(([k, v]) => (
          <Fragment>
            {v && (
              <Grid item xs={2} style={{ marginBottom: '1px' }}>
                {accessLevelIconMap[k] || <img src={img} />}
              </Grid>
            )}
          </Fragment>
        ))}
      </Grid>
    );
    return null;
  };

  const renderActionComponent = () => (
    <Grid container className={classes.ActionContainer}>
      <Grid item xs={2}>
        <Typography className={clsx(classes.ActionContainerItem)}>
          {'EDIT'}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography className={clsx(classes.ActionContainerItem)}>
          {'RESET PASSWORD'}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography
          className={clsx(
            classes.ActionContainerItem,
            classes.DeactivateButton
          )}>
          {'DEACTIVATE'}
        </Typography>
      </Grid>
    </Grid>
  );

  const headers = [
    {
      name: '',
      accessor: renderAvatar
    },
    {
      name: 'Title',
      accessor: 'title'
    },
    {
      name: 'FIRST NAME',
      accessor: 'firstname'
    },
    {
      name: 'LAST NAME',
      accessor: 'lastname'
    },
    {
      name: 'TEAM',
      accessor: 'team'
    },
    {
      name: 'ACCESS LEVEL',
      accessor: renderAccessLevel
    },
    {
      name: 'ACTIONS',
      accessor: renderActionComponent
    }
  ];

  const store = () => {
    return props.staffData.map(node => {
      return {
        firstname: node.firstname,
        lastname: node.lastname,
        team: node.team,
        title: node.title,
        profilePictureUrl: '',
        accessLevel: node.userAccessLevelsByUserId.nodes[0]
      };
    });
  };

  return (
    <Container className={classes.PageContainer}>
      {editState ? (
        <CreateStaff
          accessLevels={accessLevels}
          onSaveComplete={() => setEditState(false)}
          onCancel={() => setEditState(false)}
        />
      ) : (
        <Fragment>
          <Grid container className={classes.ButtonContainer}>
            <Grid item xs={6}>
              <Typography className={classes.StaffNumberText}>
                {`${store().length} Staff`}
              </Typography>
            </Grid>
            <Grid xs={6} item className={classes.AddButtonContainer}>
              <Typography
                className={classes.AddNewStaffButton}
                onClick={() => setEditState(true)}>
                {'ADD NEW STAFF'}
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.ListContainer} container>
            <DataTable headers={headers} data={store()} />
          </Grid>
        </Fragment>
      )}
    </Container>
  );
};

export default compose(withStaff)(Staff);
