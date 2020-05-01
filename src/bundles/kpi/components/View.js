import React, { Fragment, useState } from 'react';

import {
    Grid,
    Card,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Collapse
} from '@material-ui/core';

const KpiView = () => {

    const [ collapse, setCollapse] = useState(false) 

    const collapseComponent = (props) => (
        <tr>
            <td colSpan={3}> {/* put the number of col of your table in this field */}
                <div className={props.className}>
                    {props.children}
                </div>

            </td>
        </tr>
    )

    return (
        <Fragment>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className="card-box text-black-50 bg-secondary mb-4 p-3">
                        <div className="display-3 text-black font-weight-bold">
                            31
                    </div>
                        <div className="divider mt-2 mb-3 border-2 w-25 bg-first rounded border-warning" />
                        <div className="font-weight-bold font-size-sm text-uppercase">
                            Implemented
                      <br />
                      bugfixes
                    </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className="card-box text-black-50 bg-secondary mb-4 p-3">
                        <div className="display-3 text-black font-weight-bold">
                            31
                    </div>
                        <div className="divider mt-2 mb-3 border-2 w-25 bg-first rounded border-warning" />
                        <div className="font-weight-bold font-size-sm text-uppercase">
                            Implemented
                      <br />
                      bugfixes
                    </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className="card-box text-black-50 bg-secondary mb-4 p-3">
                        <div className="display-3 text-black font-weight-bold">
                            68
                    </div>
                        <div className="divider mt-2 mb-3 border-2 w-25 bg-success rounded border-success" />
                        <div className="font-weight-bold font-size-sm text-uppercase">
                            Unresolved
                      <br />
                      tickets
                    </div>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card className="card-box text-black-50 bg-secondary mb-4 p-3">
                        <div className="display-3 text-black font-weight-bold">
                            57
                    </div>
                        <div className="divider mt-2 mb-3 border-2 w-25 bg-warning rounded border-warning" />
                        <div className="font-weight-bold font-size-sm text-uppercase">
                            Support
                      <br />
                      requests
                    </div>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Table>
                    <TableHead>

                        <TableRow
                            hover
                            style={{ cursor: 'pointer' }}
                            onClick={() => setCollapse(!collapse)}
                        >
                            <TableCell>
                                <span>Hello world</span>
                              
                            </TableCell>
                            <TableCell>
                                <span>thanks world</span>
                              
                            </TableCell>
                            <TableCell>
                                <span>yeah world</span>
                               
                            </TableCell>
                            

                        </TableRow>
                        <TableRow
                            hover
                            style={{ cursor: 'pointer' }}
                            onClick={() => setCollapse(!collapse)}
                        >
                            <TableCell>
                                <span>Hello world</span>
                              
                            </TableCell>
                            <TableCell>
                                <span>thanks world</span>
                              
                            </TableCell>
                            <TableCell>
                                <span>yeah world</span>
                               
                            </TableCell>
                            

                        </TableRow>
                      
                        <TableRow
                            hover
                            style={{ cursor: 'pointer' }}
                            onClick={() => setCollapse(!collapse)}
                        >
                            <TableCell>
                                <span>Hello world</span>
                              
                            </TableCell>
                            <TableCell>
                                <span>thanks world</span>
                              
                            </TableCell>
                            <TableCell>
                                <span>yeah world</span>
                               
                            </TableCell>
                            

                        </TableRow>
                      
                      
                              
                        
                    </TableHead>
                </Table>
            </Grid>
        </Fragment>
    )
}

export default KpiView;