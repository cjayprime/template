import React from 'react';
import { ButtonGroup, Button, Typography } from '@material-ui/core';

const ContactStatus = ({ classes, caller, setSelected, selected }) => {
  return (
    <ButtonGroup color="primary" className={classes.buttonGroup}>
      {caller.map((item, index) => {
        return (
          <Button
            style={{ width: '100%' }}
            key={index.toString()}
            className={selected == item ? classes.buttons : classes.button}
            onClick={() => setSelected(item)}>
            <Typography style={{color: '#fff', fontSize: 16}} > {item} </Typography>
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default ContactStatus;
