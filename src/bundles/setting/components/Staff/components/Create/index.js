import React, { Fragment } from 'react';
import {
  Container,
  Grid,
  Typography,
  Avatar,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import clsx from 'clsx';
import FormBuilder from 'bundles/patient/components/custom/formBuilder';
import { Input } from 'bundles/shared/components';
import { createStaff as createStaffHoc } from 'bundles/setting/hoc/createStaff';
import { flowRight as compose } from 'lodash';
import { StaffCreateStyles } from './index.style';

const DEFAULT_RADIO_OPTIONS = ['Yes', 'No'];

const StaffCreateView = props => {
  console.log(props);
  const classes = StaffCreateStyles();

  const buildAccessLevels = ({ accessLevels }) => {
    const LevelItem = ({ level, child }) => (
      <Grid container className={classes.AccessLevelContainer}>
        <Grid
          item
          container
          className={classes.AccessLevelLabel}
          xs={5}
          wrap="nowrap">
          <Grid item xs={3} className={classes.AccessLevelIcon}>
            {level.icon}
          </Grid>
          <Grid item xs={9} className={classes.AccessLevelTextContainer}>
            <Typography className={classes.AccessLevelText}>
              {level.field}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          xs={7}
          item
          className={classes.AccessLevelIconsContainer}
          style={{
            ...(!child ? { position: 'relative', left: '3%' } : {})
          }}
          container>
          {DEFAULT_RADIO_OPTIONS.map(node => (
            <Grid item xs={6}>
              <FormControlLabel value={node} control={<Radio />} label={node} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );

    return (
      <Grid container direction="column" className={classes.AccessLevelForm}>
        {accessLevels.map(level => {
          return (
            <Grid
              container
              direction="column"
              wrap="nowrap"
              className={classes.LevelItemContainer}>
              <Grid item className={classes.LevelItem} xs={4}>
                <LevelItem level={level} />
              </Grid>
              {level.children && (
                <Grid
                  item
                  container
                  direction="column"
                  xs={6}
                  className={clsx(
                    classes.LevelItemContainer,
                    classes.LevelChildrenContainer
                  )}>
                  {level.children.map(child => (
                    <Grid item className={classes.LevelItem}>
                      <LevelItem level={{ field: child, icon: null }} child />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Container className={classes.PageContainer}>
      <Grid container className={classes.FormContainer} direction="row">
        <Grid container item xs={7} direction="column">
          <Grid
            item
            className={classes.FormContainerItem}
            xs={2}
            container
            direction="column">
            <Grid item className={classes.HeaderSection}>
              <Typography className={classes.ProfileUploadText}>
                {'Upload profile photo'}
              </Typography>
              <Grid container item className={classes.ProfileSectionContainer}>
                <Grid item className={classes.Avatar} xs={2}>
                  <Avatar className={classes.AvatarIcon} />
                </Grid>
                <Grid item xs={7} className={classes.InfoContainer}>
                  <Typography className={classes.InfoContainerText}>
                    {'Be sure to upload a clear photo of the new user.'}
                    <br />
                    {'You can upload jpg, png, or a gif file.'}
                    <br />
                    {'Maximum file size is 5MB'}
                  </Typography>
                  <Typography className={classes.UploadButton}>
                    {'UPLOAD PHOTO'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.FormContainerItem} xs={9}>
            <form className={classes.Form}>
              <Grid className={classes.FormGroupContainer} container>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'select',
                      label: 'Role',
                      fields: ['staff'],
                      labelDirection: 'column'
                    }}
                  />
                </Grid>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'select',
                      label: 'Team',
                      labelDirection: 'column',
                      fields: []
                    }}
                  />
                </Grid>
              </Grid>
              <Grid className={classes.FormGroupContainer} container>
                <Grid item xs={2} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'select',
                      label: 'Title',
                      labelDirection: 'column',
                      fields: []
                    }}
                  />
                </Grid>
                <Grid item xs={8} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'text',
                      label: 'First name',
                      labelDirection: 'column'
                    }}
                  />
                </Grid>
              </Grid>
              <Grid className={classes.FormGroupContainer} container>
                <Grid item xs={10} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'text',
                      label: 'Surname',
                      labelDirection: 'column'
                    }}
                  />
                </Grid>
              </Grid>
              <Grid className={classes.FormGroupContainer} container>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'text',
                      label: 'Phone no',
                      labelDirection: 'column'
                    }}
                  />
                </Grid>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'text',
                      label: 'Email',
                      labelDirection: 'column'
                    }}
                  />
                </Grid>
              </Grid>
              <Grid className={classes.FormGroupContainer} container>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'text',
                      label: 'Job Title',
                      labelDirection: 'column'
                    }}
                  />
                </Grid>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'text',
                      label: 'Department',
                      labelDirection: 'column'
                    }}
                  />
                </Grid>
              </Grid>
              <Grid className={classes.FormGroupContainer} container>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'select',
                      label: 'Specialty',
                      labelDirection: 'column',
                      fields: ['']
                    }}
                  />
                </Grid>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'select',
                      label: 'Sex',
                      labelDirection: 'column',
                      fields: ['Male', 'Female']
                    }}
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Grid
          item
          xs={5}
          container
          direction="column"
          className={classes.AccessLevelContainer}>
          <Grid item className={classes.AccessHeaderSection}>
            <Typography className={classes.AccessHeadertext}>
              {'Upload Access Level*'}
            </Typography>
          </Grid>
          {buildAccessLevels({ accessLevels: props.accessLevels || [] })}
        </Grid>
      </Grid>
    </Container>
  );
};

export const CreateStaff = compose(createStaffHoc)(StaffCreateView);
