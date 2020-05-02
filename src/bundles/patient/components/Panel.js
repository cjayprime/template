import React, { useState } from 'react';
import {
    Grid,
    Box,
    Typography,
    ButtonBase
} from '@material-ui/core';
import CustomText from './custom/TextInput';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    textPatient: {
        color: '#6A6981',
        fontSize: 24,
        textAlign: 'center'
    },
    text: {
        color: '#6A6981',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        color: '#fff',
        backgroundColor: '#7768CB',
        borderRadius: 32,
        width: 300,
        height: 50
    }

}))

const Panel = () => {
    const [search, setSearch] = useState('');
    return (
        <Grid
            container
            spacing={8}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: (search.length < 5) ? '80vh' : '' }}
        >
            <CustomText change={setSearch} disableUnderline={(search.length > 4)} />
            {(search.length > 4) ? <ErrorContainer /> : null}
        </Grid>
    )
}


const ErrorContainer = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            item
            direction="column"
            alignItems="center"
            justify="center"
            spacing={6}
        >
            <Grid 
                item 
                xs={6}
                sm={6}
                lg={6}
            >
                <Typography className={classes.textPatient}>
                    No patient found
                </Typography>
            </Grid>
            <Grid 
                item 
                xs={3}
                sm={3}
                lg={3}
                >
                <Typography className={classes.text}>
                    We couldn't find a patient with this phone number.
                    You can register new patient while logging a call
                </Typography>
            </Grid>
            <Grid item >
                <ButtonBase to="/CreatePatient" className={classes.button} component={Link}>
                    <Typography>
                        LOG A CALL
                    </Typography>      
                </ButtonBase>

            </Grid>

        </Grid>
    )
}



export default Panel