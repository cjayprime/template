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
  const [userContext, setUserContext] = useState(null);

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
  };

  const handleEdit = user => {
    setUserContext(user);
    setEditState(true);
  };

  const renderActionComponent = props => (
    <Grid container className={classes.ActionContainer}>
      <Grid item xs={2}>
        <Typography
          className={clsx(classes.ActionContainerItem)}
          onClick={() => handleEdit(props)}>
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
      const TYPE_NAME = '__typename';
      const ACCESS_LEVEL_KEY = 'userAccessLevelsByUserId';
      const newNode = Object.keys(node)
        .filter(item => item != TYPE_NAME && item != ACCESS_LEVEL_KEY)
        .reduce((s, k) => {
          s[k] = node[k];
          return s;
        }, {});

      return {
        ...newNode,
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
          user={userContext}
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
