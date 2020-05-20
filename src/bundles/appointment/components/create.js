import React from 'react';
import { Grid, Typography, Button, Icon } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import select from 'images/iconnew.png';
import FormBuilder from 'bundles/patient/components/custom/formBuilder';
import { useStyles } from 'bundles/patient/components/custom/patient/index.style';
import QUEUE_STATE, {
  PATIENT_PICKED_UP,
  SUBMIT_ADMITTED
} from 'bundles/queue/utilities/stateTransition';
import { searchFilter } from 'bundles/location/selectors';
import { connect } from 'react-redux';

const NewAppointment = ({
  data,
  save,
  handleClose,
  items = [],
  formState = {},
  reason = [],
  locations,
  setFormState = () => ''
}) => {
  const classes = useStyles();

  let team = undefined;
  let config = {};
  if (data) {
    team = data.team;
    config = QUEUE_STATE[team].DIALOG;
  }

  if ((data && data.status) == PATIENT_PICKED_UP) {
    config = {
      availableRooms: locations.map(item => item.name),
      nextState: SUBMIT_ADMITTED
    };
  }

  const findId = name => {
    if (!name) return undefined;
    return locations.filter(item => item.name == name)[0].id;
  };

  return (
    <Grid
      container
      direction="column"
      spacing={3}
      justify="center"
      alignItems="center"
      style={{
        height: config.availableRooms ? '40vh' : '80vh',
        backgroundColor: ''
      }}>
      <Grid item>
        {!data ? (
          <Button
            style={{
              // border: '1px solid #EFA14B',
              borderRadius: 10,
              justifyContent: 'left',
              width: 650,
              height: 85,
              padding: 10,
              boxShadow: `0px 4px 6px 0px #cacaca`,
              backgroundColor: '#fff',
              margin: 10,
              color: '#231E1E'
            }}>
            <Icon
              className="fas fa-plus-circle"
              style={{ color: '#CB6A00', fontSize: 36 }}
            />
            <Typography style={{ fontSize: 18, marginLeft: 20 }}>
              {' '}
              Add patient
            </Typography>
          </Button>
        ) : (
          <Button
            style={{
              // border: '1px solid #EFA14B',
              borderRadius: 10,
              justifyContent: 'left',
              width: 650,
              height: 85,
              padding: 10,
              boxShadow: `0px 4px 6px 0px #cacaca`,
              backgroundColor: '#fff',
              margin: 10,
              color: '#231E1E'
            }}>
            <Icon
              className="fas fa-plus-circle"
              style={{ color: '#CB6A00', fontSize: 36 }}
            />

            <Grid style={{ marginLeft: 45 }}>
              <Typography
                style={{
                  fontSize: 18
                }}>{`${data.firstName} ${data.lastName}`}</Typography>
              <Typography style={{ fontSize: 18 }}>
                {`${data.sex ? `${data.sex},` : ''} ${data.age || ''}`}
              </Typography>
            </Grid>

            <Grid style={{ marginLeft: 45 }}>
              <Chip label="High Risk" color="default" />
              <Typography style={{ fontSize: 18 }}></Typography>
            </Grid>
            <Grid style={{ marginLeft: 45 }}>
              <Typography style={{ fontSize: 18 }}>Phone Number</Typography>
              <Typography style={{ fontSize: 18 }}>
                {data.phoneNumber || '-'}
              </Typography>
            </Grid>
          </Button>
        )}
      </Grid>

      {config.date ? (
        <Grid item style={{ width: 660 }}>
          <FormBuilder
            formInput={{
              type: 'date',
              label: 'Date',
              future: true,
              key: 'date',
              fields: ['one', 'two', 'three', 'four']
            }}
            formState={formState}
            setFormState={setFormState}
          />
        </Grid>
      ) : null}
      {config.time ? (
        <Grid item style={{ width: 660 }}>
          <FormBuilder
            formInput={{
              type: 'date',
              future: true,
              label: 'Time',
              key: 'time',
              fields: ['one', 'two', 'three', 'four']
            }}
            formState={formState}
            setFormState={setFormState}
          />
        </Grid>
      ) : null}
      {config.queue ? (
        <Grid item style={{ width: 660 }}>
          <FormBuilder
            formInput={{
              type: 'select',
              label: 'Team',
              key: 'team',
              fields: config.queue ? [...config.queue] : [...items]
            }}
            formState={formState}
            setFormState={setFormState}
          />
        </Grid>
      ) : null}
      {config.reason ? (
        <Grid item style={{ width: 660 }}>
          <FormBuilder
            formInput={{
              type: 'select',
              label: 'Reason',
              key: 'reason',
              fields: config.reason ? [...config.reason] : [...reason]
            }}
            formState={formState}
            setFormState={setFormState}
          />
        </Grid>
      ) : null}
      {config.availableRooms ? (
        <Grid item style={{ width: 660 }}>
          <FormBuilder
            formInput={{
              type: 'select',
              label: 'Available Center',
              key: 'rooms',
              fields: config.availableRooms ? [...config.availableRooms] : []
            }}
            formState={formState}
            setFormState={setFormState}
          />
        </Grid>
      ) : null}

      <Grid>
        <Button
          onClick={() => save(config.nextState, findId(formState['rooms']))}
          className={classes.regButtons}
          style={{
            boxShadow: `0px 4px 6px 0px #cacaca`,
            width: 650,
            marginTop: 10,
            height: 58,
            fontSize: 18
          }}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  locations: searchFilter.getLocation(state)
});

export default connect(mapStateToProps)(NewAppointment);
