import React, { Fragment, useState } from 'react';
import withQueue from 'bundles/queue/hoc/withQueue';
import createQueue from 'bundles/queue/hoc/createQueue'
import {
    Grid,
    FormControlLabel,
    Checkbox,
    Card,
    MenuItem,
    TextField,
    FormControl,
    FormHelperText,
    Divider,
    Table,
    TableContainer,
    TableBody,
    ButtonBase,
    Button,
    Paper,
    Collapse,
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
    makeStyles
} from '@material-ui/styles';
const compose = require('lodash')?.flowRight

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Queue = ({ queues, addQueue }) => {

    const classes = useStyles();
    const [collapse, setCollapse] = useState(false)

    if (!queues) return null // Should be loader

    const sendStatus = async () => {
        const response = await addQueue({
            variables: {
                input: {
                    queue: {
                        patientEpidNumber: "3",
                        patientId: 3,
                        team: "BUS",
                    }
                }
            }
        })

        console.log(response)
    }


    return (
        <Fragment>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={12}>
                    <Card className="p-4 mb-4">
                        <div className="font-size-lg font-weight-bold"></div>
                        <TextField
                            fullWidth
                            placeholder="Search Name, Number, email"
                        />

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {queues.map((row) => {
                                        const patientObj = row.patientByPatientId

                                        return (<Fragment key={patientObj.firstname}>
                                            <TableRow hover
                                                style={{ cursor: 'pointer' }} onClick={() => setCollapse(!collapse)}>
                                                <TableCell component="th" scope="row">
                                                    {patientObj.firstname}
                                                </TableCell>
                                                <TableCell align="right">{patientObj.lastname}</TableCell>
                                                <TableCell align="right">{row.email}</TableCell>
                                                <TableCell align="right">{row.phoneNumber}
                                                </TableCell>
                                                <TableCell align="right">{row.email}</TableCell>
                                                <TableCell align="right">
                                                    <Button onClick={sendStatus}>
                                                        Change Status
                                                   </Button>
                                                </TableCell>

                                            </TableRow>

                                        </Fragment>
                                        )
                                    })}

                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Card>
                    <Grid item xs={12} lg={12}>
                        <Grid item xs={4} lg={4}>

                        </Grid>
                        <Grid item xs={4} lg={4}>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>

    )
}

export default compose(
    withQueue,
    createQueue
)(Queue)




