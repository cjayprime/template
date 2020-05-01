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
import createTriageMutation from 'bundles/patient/hoc/createTriageAnswers';
import { FormLabel, FormGroup } from '@material-ui/core';
const compose = require('lodash')?.flowRight


const CreateTriage = ({ createTriage }) => {

    const [formInput, setFormInput] = useState({})

    const handleChange = (name, value) => {
        setFormInput({ ...formInput, [name]: value });
    };

    const sendMessage = async () => {

        const response = await createTriage({
            variables: {
                input: {
                    triageAnswer: {
                        answers: "{}",
                        triageQuestionId: 1,
                        patientId: 1,
                        patientCase: {
                            create: {
                                status: "RRT",
                                riskLevel: 'MEDIUM',
                                patient: {
                                    connectById: {
                                        id: 1
                                    } ,
                                    create: {
                                        queuesToPatientIdUsingId: {
                                            create: {
                                                team: "RRT",
                                                patientEpidNumber: "1"
                                            }
                                        }
                                    }
                                }
                            }
                        }
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
}

export default compose(
    createTriageMutation
)(CreateTriage)

