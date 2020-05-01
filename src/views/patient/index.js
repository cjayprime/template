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
    Divider,
    Table,
    Collapse,
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel
} from '@material-ui/core';






const Patient = () => {
    const [collapse, setCollapse] = useState(false)

    const collapseComponent = (props) => (
        <tr>
            <td colSpan={3}> {/* put the number of col of your table in this field */}
                <div className={props.className}>
                    {props.children}
                </div>

            </td>
        </tr>
    )

    const PatientCollapseTable = () => {
        return (
            <Table>
                <TableHead>

                    <TableRow
                        hover
                        style={{ cursor: 'pointer' }}
                        onClick={() => setCollapse(!collapse)}
                    >
                         <TableCell>
                                <span>Hello world</span>
                            <Collapse
                                in={collapse}
                                timeout="auto"
                                component={collapseComponent}
                                unmountOnExit
                            >
                                {'some Conent'}
                            </Collapse>
                            </TableCell>

                    </TableRow>
                    <TableRow
                        hover
                        style={{ cursor: 'pointer' }}
                        onClick={() => setCollapse(!collapse)}
                    >
                         <TableCell>
                                <span>Hello Here</span>
                            <Collapse
                                in={collapse}
                                timeout="auto"
                                component={collapseComponent}
                                unmountOnExit
                            >
                                {'some Hello'}
                            </Collapse>
                            </TableCell>

                    </TableRow>

                </TableHead>
            </Table>
        )
    }

    return (
        <Fragment>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={12}>
                    <Card className="p-4 mb-4">
                        <div className="font-size-lg font-weight-bold">Controls types</div>
                        <TextField
                            fullWidth
                            placeholder="Write your message and hit enter to send..."
                        />
                        <PatientCollapseTable />

                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    )
}


export default Patient