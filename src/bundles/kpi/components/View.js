import React, { Fragment, useState } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import KPICard from './Card';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  tableCell: {
    color: 'white'
  }
}));

const HeadTableCell = withStyles(theme => ({
  root: {
    borderBottom: 'none'
  },
  head: {
    color: 'rgb(160, 157, 185)'
  }
}))(TableCell);

const KpiView = () => {
  const [collapse, setCollapse] = useState(false);
  const classes = useStyles();

  const collapseComponent = props => (
    <tr>
      <td colSpan={3}>
        {' '}
        {/* put the number of col of your table in this field */}
        <div className={props.className}>{props.children}</div>
      </td>
    </tr>
  );

  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            text="High risk patients awaiting pickup"
            count="1,450"
            buttonColor="rgb(101, 80, 190)"
            buttonContent={<ExpandMore />}
            buttonOnClick={() => console.log('Clicked')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            text="Lab results pending for more than a day"
            count="15"
            buttonColor="rgb(88, 184, 190)"
            buttonContent="show"
            buttonOnClick={() => console.log('Clicked')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            text="high risk patients awaiting pickup for more than a day"
            count="1"
            buttonColor="rgb(88, 184, 190)"
            buttonContent="show"
            buttonOnClick={() => console.log('Clicked')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            text="Patients awaiting sample collection for more than a day"
            count="245"
            buttonColor="rgb(88, 184, 190)"
            buttonContent="show"
            buttonOnClick={() => console.log('Clicked')}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow hover>
              <HeadTableCell>Patient</HeadTableCell>
              <HeadTableCell align="left">Request Date</HeadTableCell>
              <HeadTableCell align="left">Wait Time</HeadTableCell>
              <HeadTableCell align="left">Team</HeadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.tableCell}>
                <span>Alan Smith</span>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <span>31 Mar, 7:34 AM</span>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <span>11h 59min</span>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <span>Case Management</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell}>
                <span>Alan Smith</span>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <span>31 Mar, 7:34 AM</span>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <span>11h 59min</span>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <span>Case Management</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell}>
                <span>Alan Smith</span>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <span>31 Mar, 7:34 AM</span>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <span>11h 59min</span>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <span>Case Management</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Fragment>
  );
};

export default KpiView;
