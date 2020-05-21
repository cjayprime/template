import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  FormControlLabel,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { signOut } from 'bundles/client/components/Apollo/Link/auth';
import { flowRight as compose } from 'lodash';
import { connect } from 'react-redux';
import { saveCurrentId, logout } from 'bundles/setting/actions';
import withSingleStaff from 'bundles/setting/hoc/withSingleStaff';
import * as searchFilter from 'bundles/setting/selectors';
import MuiAlert from '@material-ui/lab/Alert';
import { DefaultCheckbox } from 'bundles/patient/components/custom/formBuilder';
import FormBuilder from 'bundles/patient/components/custom/formBuilder';
import hero from 'assets/images/hero-bg/hero-5.jpg';
import logo from 'images/lagos_logo.png';
import Loader from 'bundles/shared/components/Loader';
import { userLogin } from 'bundles/login/hoc/userLogin';


const AUTHORIZATION_KEY = "Tokens::Authorization"
const USER_PAYLOAD_KEY = "Users::Current"
const ERROR_STAR_CONSTANT = '#f44336'

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
  errorText: {
    color: ERROR_STAR_CONSTANT,
    fontSize: 15,
    fontWeight: 'bold',
    padding: '5px 0',
    textTransform: 'uppercase'
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
    labelDirection: 'column'
  },
  {
    label: 'Password',
    placeholder: '',
    type: 'password',
    key: 'password',
    required: true,
    labelDirection: 'column'
  }
];

export const Login = ({saveId, user, staff, logOutUser, ...props}) => {
  const classes = useStyle();
  const [loginData, setLoginData] = useState({ });
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  //const [snackBar, setSnackBar] = useState({open: false, message: '',  vertical: 'bottom', horizontal: 'left' })

  // function Alert(props) {
  //   return <MuiAlert elevation={6} variant="filled" {...props} />;
  // }


  if (user.id) {
    props.history.push('/Patient');
  }

  const validation = () => {
    let nonValidState = {}
    loginQuestions.forEach((field) => {
      if((field.required && !loginData[field.key]) || ( field.required && loginData[field.key] && loginData[field.key].length < 1)) {
          nonValidState[field.key] = ''
      }
    })

    if(Object.keys(nonValidState).length > 0) {
      setError('Invalid Username or Password')
      setLoginData({...loginData, ...nonValidState})
      return false
    }

    return true

    // if(Object.keys(nonValidState).length > 0) {
    //   setSnackBar({...snackBar, message: 
    //     `Invalid form Input, Please Enter
    //     ${Object.keys(nonValidState).map((item) => capitalizeFirstWord(`${item} `)).join(',')}`, open: true, state: 'error'})
    //   setFormState({...loginData, ...nonValidState})
    //   return
    // }
  }

  const setFormInitialState = value => {
    setLoginData({ ...loginData, ...value });
  };
  

  const submitForm = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } 
  }

  const handleSubmit = async () => {
    setError('')
    if (!validation()) return

    // if ( // Basic validation
    //   !Object.keys(loginData).length ||
    //   Object.values(loginData).some(node => !node.trim().length)
    // ) {
    //   return;
    // }

    try {
      const resp = await props.userLoginPG({ variables: { input: loginData } });
    // TODO {H.Ezekiel} depending on our authorization strategy we could cache resp.data.loginUser.token
      const {
        data: {
          loginUser: { token, payload } }
        } = resp;

      if (token) {
        localStorage.setItem(AUTHORIZATION_KEY, token);
        localStorage.setItem(USER_PAYLOAD_KEY, JSON.stringify(payload))
        setLoading(true)
        logOutUser(false) 
        saveId(payload.id)
        
      } else{
        signOut()
        logOutUser(true) 
        setError('Invalid Username or Password')
      }
    } catch(err) {
      signOut()
      logOutUser(true) 
      setError('Invalid Username or Password')
    }
    
  };

  return (
    <Grid>
      <Grid
        container
        spacing={0}
        onKeyPress={(e) => submitForm(e)}
        style={{ minHeight: '100vh', backgroundColor: '#2C2E40' }}>
        <Grid xs={6} item>
          <Grid container justify="center" style={{ height: '100%' }}>
            <Grid xs={7} item style={{ paddingTop: 140 }}>
              <img src={logo} alt="logo" />
              <Typography
                className={classes.headerText}
                style={{ marginTop: 30 }}>
                Lagos State
              </Typography>
              <Typography className={classes.headerText}>
                Emergency Response System
              </Typography>
              <Typography className={classes.subHeaderText}>
                Welcome back, please login to your account
              </Typography>
              <div className={classes.loginForm}>
                {loginQuestions.map((question, index) => (
                  <FormBuilder
                    key={index}
                    formInput={question}
                    setFormState={setFormInitialState}
                    formState={loginData}
                  />
                ))}
              </div>
              <Grid container justify="space-between">
                <Typography className={classes.errorText}>
                  {error}
                </Typography>
                {/* <FormControlLabel
                control={<DefaultCheckbox name="rememberMe" />}
                label={
                  <Typography className={classes.regLabelText}>
                    {' '}
                    Remember me
                  </Typography>
                }
              /> */}
                <Button className={classes.actionButton}>
                  Forgot password?
                </Button>
              </Grid>
              <div style={{ marginTop: 30 }}>  
               {loading?  <Loader status={true} /> :
                <Button
                  disableElevation={false}
                  onClick={handleSubmit}
                  className={classes.formButton}>
                  Login
                </Button>
               }                
              </div>
            </Grid>
         
          </Grid>
        </Grid>
        <Grid
          xs={6}
          item
          style={{
            backgroundImage: `url(${hero})`,
            clipPath: 'polygon(23% 0, 100% 0%, 100% 100%, 0 100%)'
          }}></Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = dispatch => ({
  saveId: value => dispatch(saveCurrentId(value)),
  logOutUser: value => dispatch(logout(value))
});


const mapStateToProps = state => ({
  user: searchFilter.getUser(state),
});

export default compose(connect(mapStateToProps, mapDispatchToProps),userLogin, withSingleStaff, withRouter)(Login);
