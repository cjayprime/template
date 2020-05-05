import React, { Fragment } from 'react';
import clsx from 'clsx';
import {
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  Typography,
  Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  labelText: {
    fontSize: 20,
    color: '#d7d7d7'
  },
  container: {
    marginBottom: 20,
    padding: theme.spacing(2)
  },
  icon: {},
  button: {
    color: '#fff',
    borderRadius: 32,
    '&:hover': {
      backgroundColor: '#FF5B66'
    },
    width: 250,
    height: 50
  },
  buttons: {
    color: '#fff',
    borderRadius: 32,
    backgroundColor: '#28BAC0',
    width: 250,
    height: 50
  }
}));

const RegisterPatient = ({ classes, func }) => {
  return (
    <Grid container className={classes.container} direction="row">
      <Grid item xs={6}>
        <FormControlLabel
          control={<Checkbox color="primary" name="checkedC" />}
          label={
            <Typography className={classes.labelText}>
              {' '}
              Send Emmergency Number to caller{' '}
            </Typography>
          }
        />
      </Grid>
      <Grid item xs={6}>
        <Grid container style={{ paddingRight: 10 }} justify="flex-end">
          <Button onClick={() => func()} className={classes.buttons}>Save</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Footer = props => {
  const classes = useStyles();
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
        <RegisterPatient classes={classes} func={props.dispatchFunc} />
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  footerFixed: state.ThemeOptions.footerFixed,
  footerShadow: state.ThemeOptions.footerShadow,
  dispatchFunc: state.ThemeOptions.dispatchFunc,
  sidebarToggle: state.ThemeOptions.sidebarToggle
});
export default connect(mapStateToProps)(Footer);
