import React, { Fragment, useState } from 'react';

import {
    Grid,
    FormControlLabel,
    Checkbox,
    Card,
    MenuItem,
    TextField,
    FormControl,
    FormHelperText,
    Button,
    Divider
} from '@material-ui/core';
import createLocationMutation from 'bundles/location/hoc/createLocation'; 
import { FormLabel, FormGroup } from '@material-ui/core';
const compose = require('lodash')?.flowRight


const CreateLocation = ({ createLocation }) => {

    const [formInput, setFormInput] = useState({})

    const handleChange = (key, value) => {
        setFormInput({ ...formInput, [key]: value });
    };

    const createBed = async () => {
        const response = await createLocation({
            variables: {
                input: {
                    location: {
                        ...formInput
                    }
                }
            }
        })

        console.log(response)
    }

    return (
        <Fragment>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={6}>
                    <Card className="p-4 mb-4">
                        <div className="font-size-lg font-weight-bold">Center </div>
                        <Divider className="my-4" />
                        <Grid container spacing={4}>
                            <Grid item xs={12} lg={6}>
                                <div className="p-3">
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-basic"
                                        label="Standard"
                                        onChange={(e) => handleChange('name', e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-basic"
                                        label="Standard"
                                        onChange={(e) => handleChange('numberOfBeds', parseInt(e.target.value))}
                                    />
                                    <Button onClick={createBed}>
                                        Create Bed
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default compose(
    createLocationMutation
)(CreateLocation)
