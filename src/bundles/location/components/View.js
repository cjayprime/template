import React, { Fragment, useState } from 'react';
import withLocations from 'bundles/location/hoc/withLocation';
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

const Location = ({ locationData }) => {

    const classes = useStyles();
    const [collapse, setCollapse] = useState(false)


    if (!locationData) return null // Should be loader


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
                                    {locationData.map((row) => {


                                        return (<Fragment key={row.name}>
                                            <TableRow hover
                                                style={{ cursor: 'pointer' }} onClick={() => setCollapse(!collapse)}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.numberOfBeds}
                                                </TableCell>
                                                <TableCell align="right">
                                                    Edit
                                                </TableCell>

                                            </TableRow>

                                        </Fragment>
                                        )
                                    })}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                    <ButtonBase to="/CreateLocation" component={Link}>
                        Create Location
                    </ButtonBase>
                </Grid>
            </Grid>
        </Fragment>

    )
}

export default compose(
    withLocations,
)(Location)




