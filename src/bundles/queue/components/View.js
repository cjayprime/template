
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
import { QueueTableView } from './Views/QueueTable'
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
          <QueueTableView />
        </Fragment>

    )
}

export default compose(
    withQueue,
    createQueue
)(Queue)
