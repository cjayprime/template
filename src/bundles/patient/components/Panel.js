import React, { Fragment, useState } from 'react';
import withPatient from 'bundles/patient/hoc/withPatient';
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

const Panel = ({ patients }) => {

    const classes = useStyles();
    const [collapse, setCollapse] = useState(false)

    if (!patients) return null // Should be loader

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
                                    {patients.map((row) => (
                                        <Fragment key={row.firstname}>
                                            <TableRow hover
                                                style={{ cursor: 'pointer' }} onClick={() => setCollapse(!collapse)}>
                                                <TableCell component="th" scope="row">
                                                    {row.firstname}
                                                </TableCell>
                                                <TableCell align="right">{row.lastname}</TableCell>
                                                <TableCell align="right">{row.email}</TableCell>
                                                <TableCell align="right">{row.phoneNumber}
                                                </TableCell>
                                                <TableCell align="right">{row.email}</TableCell>
                                                <TableCell align="right">{row.email}</TableCell>

                                            </TableRow>

                                        </Fragment>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Card>
                    <Grid item xs={12} lg={12}>
                        <Grid item xs={4} lg={4}>
                            <ButtonBase to="/CreatePatient" component={Link}>
                                Create Patient
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={4} lg={4}>
                            
                            <ButtonBase to="/CreateTriage" component={Link}>
                                Create Triage
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>

    )
}

export default compose(
    withPatient
)(Panel)



