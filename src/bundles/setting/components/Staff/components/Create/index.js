import React, { Fragment, useState, useEffect } from 'react';
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
import pointer from 'images/pointer.png';
import { Input } from 'bundles/shared/components';
import { createStaff as createStaffHoc } from 'bundles/setting/hoc/createStaff';
import { flowRight as compose } from 'lodash';
import { StaffCreateStyles } from './index.style';

const DEFAULT_RADIO_OPTIONS = ['Yes', 'No'];

const StaffCreateView = props => {
  const classes = StaffCreateStyles();
  const { user } = props;

  const defaultFormState = () => {
    if (!user) return {};
    const userObj = { ...user };
    [('__typename', 'accesslevel')].forEach(key => delete userObj[key]);
    return userObj;
  };

  const buildAccessLevelsFromInitialUser = () => {
    if (!user) return {};
    const accessLevel = { ...user.accessLevel };
    delete accessLevel['__typename'];
    return Object.entries(accessLevel).reduce((sum, [key, value]) => {
      if (typeof value === 'string') {
        sum[key] = value.split(',').reduce((acc, current) => {
          acc[current] = 'Yes';
          return acc;
        }, {});
      } else {
        sum[key] = value ? 'Yes' : 'No';
      }
      return sum;
    }, {});
  };

  const [formState, setFormState] = useState(defaultFormState());
  const [accessLevels, setAccessLevel] = useState(
    buildAccessLevelsFromInitialUser()
  );

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
            [parent.key]: {
              ...(accessLevels[parent.key] || {}),
              [name]: value
            }
          })
    };
    setAccessLevel(newAccessLevelState);
  };

  const yieldValueFromState = (key, parent) => {
    if (!parent) return accessLevels[key];
    return (accessLevels[parent.key] || {})[key];
  };

  const purgeInput = () => {
    setFormState({});
    setAccessLevel({});
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

    const createAccessLevel = { create: buildPayloadFromAccessLevels() };

    const updateAccessLevel = {
      updateById: {
        id: user.accessLevel.id,
        userAccessLevelPatch: {
          ...buildPayloadFromAccessLevels(),
          id: user.accessLevel.id
        }
      }
    };

    return {
      ...formState,
      userAccessLevels: user ? updateAccessLevel : createAccessLevel
    };
  };

  const handleSave = async () => {
    try {
      const input = buildCreateInput();
      const { createStaffPG, updateStaffPG } = props;
      if (!user) {
        await createStaffPG({ variables: { input: { user: input } } });
      } else {
        await updateStaffPG({
          variables: {
            input: { nodeId: user.nodeId, userPatch: { id: user.id, ...input } }
          }
        });
      }
      purgeInput();
      props.onSaveComplete();
    } catch (e) {
      // handle error here
      console.log(e);
    }
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
          <Grid item xs={2} className={classes.AccessLevelIcon}>
            {child ? <img src={pointer} /> : level.icon}
          </Grid>
          <Grid item xs={10} className={classes.AccessLevelTextContainer}>
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
              ...(!child ? { position: 'relative', left: '5%' } : {})
            }}
            container>
            <Grid item xs={12}>
              <RadioGroup
                row
                name={level.field}
                onChange={e =>
                  handleAccessLevelChange(level.key, e.target.value, parent)
                }
                value={yieldValueFromState(level.key, parent)}>
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
                        level={{
                          field: child,
                          icon: null,
                          parent: level,
                          key: child
                        }}
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
                      key: 'role',
                      fields: ['staff'],
                      labelDirection: 'column',
                      defaultValue: user?.role
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
                      key: 'team',
                      labelDirection: 'column',
                      fields: ['RRT', 'Evac & Decon'],
                      defaultValue: user?.team
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
                      key: 'title',
                      labelDirection: 'column',
                      fields: ['Dr', 'Mr', 'Mrs', 'Ms'],
                      defaultValue: user?.title
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
                      key: 'firstname',
                      labelDirection: 'column',
                      defaultValue: user?.firstname
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
                      lastname: 'lastname',
                      labelDirection: 'column',
                      defaultValue: user?.lastname
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
                      key: 'phoneNumber',
                      labelDirection: 'column',
                      defaultValue: user?.phoneNumber
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
                      key: 'email',
                      labelDirection: 'column',
                      defaultValue: user?.email
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
                      key: 'email',
                      labelDirection: 'column',
                      defaultValue: user?.jobTitle
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
                      key: 'department',
                      labelDirection: 'column',
                      defaultValue: user?.department
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
                      key: 'speciality',
                      labelDirection: 'column',
                      fields: [''],
                      defaultValue: user?.speciality
                    }}
                    formState={formState}
                    setFormState={handleChange('speciality')}
                  />
                </Grid>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormBuilder
                    formInput={{
                      type: 'select',
                      label: 'Sex',
                      key: 'sex',
                      labelDirection: 'column',
                      fields: ['MALE', 'FEMALE'],
                      defaultValue: user?.sex
                    }}
                    formState={formState}
                    setFormState={handleChange('sex')}
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
          <Typography
            className={classes.ButtonText}
            onClick={() => {
              purgeInput();
              props.onCancel();
            }}>
            {'Cancel'}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button className={classes.Button} onClick={handleSave}>
            {user ? 'Update' : 'Save'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export const CreateStaff = compose(createStaffHoc)(StaffCreateView);
