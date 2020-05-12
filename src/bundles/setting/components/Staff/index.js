import React from 'react';
import { Container, Grid, Typography, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import { Header, DataTable } from 'bundles/shared/components';
import { StaffPageStyles } from './index.style.js';
import { store } from './store';
import { StaffCreateView } from './components/Create';

const Staff = () => {
  const classes = StaffPageStyles();
  const renderAvatar = props => (
    <Avatar
      className={classes.Avatar}
      src={props.profilePictureUrl}
      alt={`${props.firstName}-profile-picture`}
    />
  );
  const renderAccessLevel = () => <div></div>;

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
      accessor: 'firstName'
    },
    {
      name: 'LAST NAME',
      accessor: 'lastName'
    },
    {
      name: 'TEAM',
      accessor: 'team.name'
    },
    {
      name: 'ACCESS LEVEL',
      accessor: 'accessLevel'
    },
    {
      name: 'ACTIONS',
      accessor: renderActionComponent
    }
  ];

return (<StaffCreateView />)

  // TODO {H.Ezekiel} move this to StaffList component
  return (
    <Container className={classes.PageContainer}>
      <Grid container className={classes.ButtonContainer}>
        <Grid item xs={6}>
          <Typography className={classes.StaffNumberText}>
            {`${store.length} Staff`}
          </Typography>
        </Grid>
        <Grid xs={6} item className={classes.AddButtonContainer}>
          <Typography className={classes.AddNewStaffButton}>
            {'ADD NEW STAFF'}
          </Typography>
        </Grid>
      </Grid>
      <Grid className={classes.ListContainer} container>
        <DataTable headers={headers} data={store} />
      </Grid>
    </Container>
  );
};

export default Staff;
