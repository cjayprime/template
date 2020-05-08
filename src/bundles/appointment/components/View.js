import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core'

const View = () => {
    return (
        <ButtonBase to="/CreateAppointment" component={Link}> 
            Create Appointment
        </ButtonBase>
    )
}

export default View; 