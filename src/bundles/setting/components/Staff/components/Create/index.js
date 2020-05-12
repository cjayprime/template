import React, { Fragment } from 'react';
import {
  Container,
  Grid,
  Typography,
  Avatar,
  TextField,
  FormLabel
} from '@material-ui/core';
import { StaffCreateStyles, InputStyles } from './index.style';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const Input = props => {
  const classes = InputStyles();
  return (
    <TextField
      select={props.select}
      variant="filled"
      fullWidth
      name={props.name}
      className={classes.TextInputContainer}
      InputProps={{
        classes: { root: classes.InputView },
        disableUnderline: true,
        defaultValue: props.defaultValue || ''
      }}
      SelectProps={{
        IconComponent: () => (
          <KeyboardArrowDownIcon className={classes.SelectInputIcon} />
        ),
        classes: { filled: classes.SelectInput }
      }}>
      {props.select && (
        <Fragment>
          {[{ value: '' }, ...props.options].map(opt => (
            <option value={opt.value}>{opt.value}</option>
          ))}
        </Fragment>
      )}
    </TextField>
  );
};

export const StaffCreateView = props => {
  const classes = StaffCreateStyles();
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
                  <FormLabel className={classes.FormGroupLabel}>
                    {'Role'}
                  </FormLabel>
                  <Input select options={[{ value: 'Staff' }]} />
                </Grid>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormLabel className={classes.FormGroupLabel}>
                    {'Team'}
                  </FormLabel>
                  <Input select options={[{ value: 'Add to Team' }]} />
                </Grid>
              </Grid>
              <Grid className={classes.FormGroupContainer} container>
                <Grid item xs={2} className={classes.FormGroupItem}>
                  <FormLabel className={classes.FormGroupLabel}>
                    {'Title'}
                  </FormLabel>
                  <Input
                    select
                    options={[{ value: 'Dr.' }]}
                    defaultValue="Dr."
                  />
                </Grid>
                <Grid item xs={8} className={classes.FormGroupItem}>
                  <FormLabel className={classes.FormGroupLabel}>
                    {'First Name'}
                  </FormLabel>
                  <Input name="firstName" />
                </Grid>
              </Grid>
              <Grid className={classes.FormGroupContainer} container>
                <Grid item xs={10} className={classes.FormGroupItem}>
                  <FormLabel className={classes.FormGroupLabel}>
                    {'Surname'}
                  </FormLabel>
                  <Input name="surName" />
                </Grid>
              </Grid>
              <Grid className={classes.FormGroupContainer} container>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormLabel className={classes.FormGroupLabel}>
                    {'Phone Number'}
                  </FormLabel>
                  <Input name="phoneNumber" />
                </Grid>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormLabel className={classes.FormGroupLabel}>
                    {'Email'}
                  </FormLabel>
                  <Input name="email" />
                </Grid>
              </Grid>
              <Grid className={classes.FormGroupContainer} container>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormLabel className={classes.FormGroupLabel}>
                    {'Job Title*'}
                  </FormLabel>
                  <Input name="jobTitle" />
                </Grid>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormLabel className={classes.FormGroupLabel}>
                    {'Department'}
                  </FormLabel>
                  <Input name="department" />
                </Grid>
              </Grid>
              <Grid className={classes.FormGroupContainer} container>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormLabel className={classes.FormGroupLabel}>
                    {'Specialty'}
                  </FormLabel>
                  <Input select options={[{ value: '' }]} />
                </Grid>
                <Grid item xs={5} className={classes.FormGroupItem}>
                  <FormLabel className={classes.FormGroupLabel}>
                    {'Sex'}
                  </FormLabel>
                  <Input
                    select
                    options={[{ value: 'Male' }]}
                    defaultValue="Male"
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Grid item xs={5}></Grid>
      </Grid>
    </Container>
  );
};
