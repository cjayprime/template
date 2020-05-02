import React, { Fragment, useState } from 'react';

import {
  Grid,
  Typography,
  AppBar,
  ButtonGroup,
  Button
} from '@material-ui/core';

import Phone from '@material-ui/icons/Phone';
import CloseIcon from '@material-ui/icons/Close';
import FormBuilder from './custom/formBuilder';
import { makeStyles } from '@material-ui/core/styles';
import { QUESTIONS } from './custom/questions';
import { BottomNavigation } from '@material-ui/core';

const compose = require('lodash')?.flowRight;

const useStyles = makeStyles(theme => ({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  },
  container: {
    minHeight: 600
    //maxheight: 300
  },
  childGrid: {
    padding: theme.spacing(2)
  },
  text: {
    color: '#d7d7d7',
    fontSize: 25,
    textAlign: 'center',
    marginLeft: 20
  },
  labelText: {
    fontSize: 12
  },
  description: {
    marginTop: 25,
    color: '#dad9e1',
    fontSize: 25,
    marginBottom: 40
  },
  icon: {
    paddingTop: 5,
    color: '#fff'
  },
  buttonGroup: {
    height: 70,
    border: '2px solid #7768CB',
    marginBottom: 50
  },
  button: {
    border: '2px solid transparent',
    fontSize: 16,
    color: '#8E8CA7',
  },
  buttons: {
    fontSize: 16,
    color: '#8E8CA7',
    backgroundColor: '#7768CB',
    '&:hover': {
      backgroundColor: '#7768CB'
    }
  }
}));

const caller = [
  'Direct Contact',
  'Third Party',
  'Health Facility',
  'Other states',
  'Port of Entry',
  'LASHMA'
];



const CreatePatient = () => {
  const [selected, setSelected] = useState('');

  const classes = useStyles();

  return (
    <Fragment>
      <Grid
        container
        spacing={2}
        direction="column"
        className={classes.container}> 
        <AppBar elevation={0} style={{ backgroundColor: 'transparent' }} position="sticky">
          <Grid container xs={12} className={classes.childGrid} direction="row">
            <Grid container xs={6} justify="flex-start">
              <Phone className={classes.icon} />

              <Typography className={classes.text}>
                Register New Patient
              </Typography>
            </Grid>

            <Grid container xs={6} lg={6} md={6} justify="flex-end">
              <CloseIcon className={classes.icon} />
            </Grid>
          </Grid>
        </AppBar>

        <Grid container xs={12} className={classes.childGrid} justify="center">
          <Grid
            container
            xs={7}
            md={7}
            direction="column"
            justify="center"
            alignItems="center">
            <Grid></Grid>

            <Grid>
              <Grid container direction="column">
                <ButtonGroup
                  color="primary"
                  className={classes.buttonGroup}
                  aria-label="outlined primary button group">
                  {caller.map((item, index) => {
                    return (
                      <Button
                        style={{ width: '100%' }}
                        key={index}
                        className={
                          selected == item ? classes.buttons : classes.button
                        }
                        onClick={() => setSelected(item)}>
                        {item}
                      </Button>
                    );
                  })}
                </ButtonGroup>

                {QUESTIONS.map(item => {
                  return (
                    <Grid key={item.title}>
                      <Typography className={classes.description}>
                        {item.title}
                      </Typography>
                      <Grid container alignItems="center">
                        {item.content.map((formElements, index) => {
                          return (
                            <FormBuilder key={index} formInput={formElements} />
                          );
                        })}
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Fragment>
  );
};

export default CreatePatient;

/*const CreatePatient = ({ createPatientPG }) => {

    const [formInput, setFormInput] = useState({})

    const handleChange = (name, value) => {
        setFormInput({ ...formInput, [name]: value });
    };

    const sendMessage = async () => {
        const response = await createPatientPG({
            variables: {
                input: {
                    patient: {
                        ...formInput
                    }
                }
            }
        })

    }

    return (
        <Fragment>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={6}>
                    <Card className="p-4 mb-4">
                        <div className="font-size-lg font-weight-bold">Controls types</div>
                        <Divider className="my-4" />
                        <Grid container spacing={4}>
                            <Grid item xs={12} lg={6}>
                                <div className="p-3">
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-basic"
                                        label="Standard"
                                        onChange={(e) => handleChange('firstname', e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-basic"
                                        label="Standard"
                                        onChange={(e) => handleChange('lastname', e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-basic"
                                        label="Standard"
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        type="email"
                                    />
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-basic"
                                        label="Standard"
                                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                        type="number"
                                    />
                                    <Button onClick={sendMessage}>
                                        Save Patient
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    );
} */

/*export default compose(
  createPatientMutation
)(CreatePatient)

*/
