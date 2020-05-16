import React, { Fragment, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Avatar,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from '@material-ui/core';
import clsx from 'clsx';
import FormBuilder from 'bundles/patient/components/custom/formBuilder';
import { Input } from 'bundles/shared/components';
import { createStaff as createStaffHoc } from 'bundles/setting/hoc/createStaff';
import { flowRight as compose } from 'lodash';
import { StaffCreateStyles } from './index.style';

const DEFAULT_RADIO_OPTIONS = ['Yes', 'No'];

const StaffCreateView = props => {
  const [formState, setFormState] = useState({});
  const [accessLevels, setAccessLevel] = useState({});
  const classes = StaffCreateStyles();

  const handleChange = name => newValue => {
    const newState = { ...formState, [name]: Object.values(newValue)[0] };
    setFormState(newState);
  };

  const handleAccessLevelChange = (name, value, parent) => {
    const newAccessLevelState = {
      ...accessLevels,
      ...(!parent
        ? { [name]: value }
        : {
            [parent.field]: {
              ...(accessLevels[parent.field] || {}),
              [name]: value
            }
          })
    };
    setAccessLevel(newAccessLevelState);
  };

  const yieldValueFromState = (key, parent) => {
    if (!parent) return accessLevels[key];
    return (accessLevels[parent.field] || {})[key];
  };

  const buildCreateInput = () => {
    const buildPayloadFromAccessLevels = () =>
      Object.entries(accessLevels).reduce((s, [k, v]) => {
        if (typeof v === 'string') {
          s[k] = v === DEFAULT_RADIO_OPTIONS[0];
        } else {
          s[k] = Object.keys(v).join(',');
        }
        return s;
      }, {});
    const opts = { ...formState, ...buildPayloadFromAccessLevels() };
    return opts;
  };

  const handleSave = () => {
    console.log(buildCreateInput());
    console.log({ ...formState, accessLevels: accessLevels });
  };

  const buildAccessLevels = ({ accessLevels }) => {
    const LevelItem = ({ level, child, parent }) => (
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
        {!level.children && (
          <Grid
            xs={7}
            item
            className={classes.AccessLevelIconsContainer}
            style={{
              ...(!child ? { position: 'relative', left: '3%' } : {})
            }}
            container>
            <Grid item xs={12}>
              <RadioGroup
                row
                name={level.field}
                onChange={e =>
                  handleAccessLevelChange(level.field, e.target.value, parent)
                }
                value={yieldValueFromState(level.field, parent)}>
                {DEFAULT_RADIO_OPTIONS.map(node => (
                  <FormControlLabel
                    value={node}
                    control={
                      <Radio
                        classes={{
                          root: classes.Radio,
                          checked: classes.RadioChecked
                        }}
                      />
                    }
                    label={node}
                  />
                ))}
              </RadioGroup>
            </Grid>
          </Grid>
        )}
      </Grid>
    );

    return (
      <Grid
        container
        direction="column"
        className={classes.AccessLevelForm}
        wrap="nowrap">
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
                      <LevelItem
                        level={{ field: child, icon: null, parent: level }}
                        child
                        parent={level}
                      />
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
        <Grid container item xs={7} direction="column" wrap="nowrap">
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
                    formState={formState}
                    setFormState={handleChange('role')}
                  />
                </Grid>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'select',
                      label: 'Team',
                      labelDirection: 'column',
                      fields: ['RRT', 'Evac & Decon']
                    }}
                    formState={formState}
                    setFormState={handleChange('team')}
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
                    formState={formState}
                    setFormState={handleChange('title')}
                  />
                </Grid>
                <Grid item xs={8} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'text',
                      label: 'First name',
                      labelDirection: 'column'
                    }}
                    key="firstName"
                    formState={formState}
                    setFormState={handleChange('firstname')}
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
                    formState={formState}
                    setFormState={handleChange('lastname')}
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
                    formState={formState}
                    setFormState={handleChange('phoneNumber')}
                  />
                </Grid>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'text',
                      label: 'Email',
                      labelDirection: 'column'
                    }}
                    formState={formState}
                    setFormState={handleChange('email')}
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
                    formState={formState}
                    setFormState={handleChange('jobTitle')}
                  />
                </Grid>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'text',
                      label: 'Department',
                      labelDirection: 'column'
                    }}
                    formState={formState}
                    setFormState={handleChange('department')}
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
                    formState={formState}
                    setFormState={handleChange('specialty')}
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
                    formState={formState}
                    setFormState={handleChange('Sex')}
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
          wrap="nowrap"
          className={classes.AccessLevelContainer}>
          <Grid item className={classes.AccessHeaderSection}>
            <Typography className={classes.AccessHeadertext}>
              {'Upload Access Level*'}
            </Typography>
          </Grid>
          {buildAccessLevels({ accessLevels: props.accessLevels || [] })}
        </Grid>
      </Grid>
      <Grid className={classes.ButtonContainer} container>
        <Grid item xs={2} className={classes.ButtonContainerItem}>
          <Typography className={classes.ButtonText}>{'Cancel'}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button className={classes.Button} onClick={handleSave}>
            {'Save'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export const CreateStaff = compose(createStaffHoc)(StaffCreateView);
