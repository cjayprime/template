import React from 'react';
import {
  Grid,
  Typography,
  Button,
  FormControlLabel,
  makeStyles
} from '@material-ui/core';
import { DefaultCheckbox } from 'bundles/patient/components/custom/formBuilder';
import FormBuilder from 'bundles/patient/components/custom/formBuilder';
import hero from 'assets/images/hero-bg/hero-5.jpg';
import logo from 'images/lagos_logo.png';
// import logo from 'assets/images/stock-logos/1.svg';

const useStyle = makeStyles(theme => ({
  headerText: {
    color: '#fff',
    fontSize: 36
  },
  subHeaderText: {
    color: '#BDB8D9',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10
  },
  loginForm: {
    marginTop: 70
  },
  regLabelText: {
    fontSize: 20,
    color: '#fff'
  },
  actionButton: {
    color: '#27BAC0',
    fontSize: 15,
    fontWeight: 'bold',
    padding: '5px 0',
    textTransform: 'uppercase'
  },
  formButton: {
    backgroundColor: '#28BAC0',
    boxShadow:
      '0 6px 16px rgba(39, 186, 192, 0.20), 0 2px 10px rgba(39, 186, 192, 0.10)',
    borderRadius: 20,
    textTransform: 'uppercase',
    border: 'none',
    color: 'white',
    lineHeight: 1.5,
    fontSize: 16,
    padding: '10px 50px 10px',
    '&:hover': {
      backgroundColor: '#28BAC0',
      border: 'none'
    },
    '&:active': {
      backgroundColor: '#28BAC0',
      border: 'none'
    }
  }
}));

const loginQuestions = [
  {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    key: 'email',
    required: true,
    labelDirection: 'column',
  },
  {
    label: 'Password',
    placeholder: '',
    type: 'password',
    key: 'password',
    required: true,
    labelDirection: 'column',
  },
]

export const Login = () => {
  const classes = useStyle();

  return (
    <>
      <Grid container spacing={0} style={{ minHeight: '100vh', backgroundColor: '#2C2E40' }}>
        <Grid xs={6} item>
         <Grid container justify="center" style={{ height: '100%' }}>
          <Grid xs={7} item style={{ paddingTop: 140 }}>
            <img src={logo} alt="logo"/>
            <Typography className={classes.headerText} style={{ marginTop: 30 }}>
              Lagos State Public Health
            </Typography>
            <Typography className={classes.headerText}>
              Emergency Response System
            </Typography>
            <Typography className={classes.subHeaderText}>
              Welcome back, please login to your account
            </Typography>
            <div className={classes.loginForm}>
              {
                loginQuestions.map((question, index) => 
                  <FormBuilder
                    key={index}
                    formInput={question}
                    // setFormState={setFormInitialState}
                    // formState={formState}
                  />
                )
              }
            </div>
            <Grid container justify="flex-end">
              {/* <FormControlLabel
                control={<DefaultCheckbox name="rememberMe" />}
                label={
                  <Typography className={classes.regLabelText}>
                    {' '}
                    Remember me
                  </Typography>
                }
              /> */}
              <Button
                className={classes.actionButton}>
                Forgot password?
              </Button>
            </Grid>
            <div style={{ marginTop: 30 }}>
            <Button
              disableElevation={false}
              className={classes.formButton}>
              Login
            </Button>
            </div>
          </Grid>
         </Grid>
        </Grid>
        <Grid xs={6}
          item 
          style={{
            backgroundImage: `url(${hero})`,
          }}
        >
        </Grid>
      </Grid>
    </>
  );
};