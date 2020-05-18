import React, { Fragment } from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

import { BarLoader } from 'react-spinners';

import {
  BeatLoader,
  BounceLoader,
  CircleLoader,
  ClimbingBoxLoader
} from 'react-spinners';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import { Line } from 'react-chartjs-2';

const TableCell = withStyles({
  root: {
    borderBottom: 'none'
  }
})(MuiTableCell);

const SHADOW_BACKDROP = '#282A3D';
const data4MultipleData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderColor: '#7a7b97',
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#7a7b97',
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 3,
      pointHoverRadius: 6,
      pointHoverBorderWidth: 3,
      pointRadius: 4,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#7a7b97',
      data: [65, 59, 80, 81, 56, 55, 40],
      datalabels: {
        display: false
      },
      label: "Today's Earnings"
    },
    {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderColor: '#4191ff',
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#4191ff',
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 3,
      pointHoverRadius: 6,
      pointHoverBorderWidth: 3,
      pointRadius: 4,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#4191ff',
      data: [65, 81, 56, 59, 80, 55, 40],
      datalabels: {
        display: false
      },
      label: 'Current Week'
    },
    {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderColor: '#f4772e',
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#f4772e',
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 3,
      pointHoverRadius: 6,
      pointHoverBorderWidth: 3,
      pointRadius: 4,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#f4772e',
      data: [28, 48, 19, 86, 27, 40, 90],
      datalabels: {
        display: false
      },
      label: 'Previous Week'
    }
  ]
};
const data4MultipleOptions = {
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  },
  scales: {
    yAxes: [
      {
        ticks: {
          display: true,
          beginAtZero: true
        },
        gridLines: {
          display: true,
          color: '#eeeff8',
          drawBorder: true
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          display: true,
          beginAtZero: true
        },
        gridLines: {
          display: true,
          color: '#eeeff8',
          drawBorder: true
        }
      }
    ]
  },
  legend: {
    display: false
  },
  responsive: true,
  maintainAspectRatio: false
};

const chart5Options = {
  chart: {
    toolbar: {
      show: false
    },
    sparkline: {
      enabled: true
    },
    stacked: true
  },
  dataLabels: {
    enabled: true
  },
  plotOptions: {
    bar: {
      horizontal: false,
      endingShape: 'rounded',
      columnWidth: '80%'
    }
  },
  colors: ['#7fe4a6', '#7fe2ec', '#7fc8fd', '#ff98a4'],
  fill: {
    opacity: 1
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  legend: {
    show: false
  },
  labels: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Last week',
    'Last month'
  ]
};
const chart5Data = [
  {
    name: 'Net Profit',
    data: [2.3, 3.1, 4.0, 3.8, 5.1, 3.6, 4.0, 3.8, 5.1]
  },
  {
    name: 'Weekly Stats',
    data: [2.3, 3.1, 5.1, 3.6, 4.0, 4.0, 3.8, 3.6, 3.8]
  },
  {
    name: 'Sales reports',
    data: [2.3, 3.1, 5.1, 3.6, 4.0, 4.0, 3.8, 3.6, 3.8]
  },
  {
    name: 'Net Loss',
    data: [2.1, 2.1, 3.0, 2.8, 4.0, 3.8, 5.1, 3.6, 4.1]
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  table: {},
  container: {
    border: '1px solid #3A3C4F',
    borderRadius: 10,
    padding: 20,
    boxShadow: `0px 4px 8px 0px #CACACA`,
    backgroundColor: '#3A3C4F',
    margin: 10,
    color: '#fff'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 15,
    textAlign: 'center'
  },
  content: {
    marginBottom: 20,
    textAlign: 'center'
  },
  valueText: {
    fontWeight: 'bold',
    fontSize: 15
  },
  tableHeader: {
    backgroundColor: 'blue'
  },
  tableRoot: {
    width: '100%',
    overflowX: 'auto',
    backgroundColor: '#3A3C4F',
    borderRadius: 10,
    boxShadow: `0px 4px 8px 0px #CACACA`
  }
}));

const boxStyles = makeStyles({});

const useNewStyle = makeStyles(theme => ({}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

const TableTransformer = () => {
  const classes = useStyles();

  return (
    <TableContainer style={{ maxHeight: 400 }} component={Grid}>
      <Table className={classes.tableRoot} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: '#fff' }}>S/N</TableCell>
            <TableCell style={{ color: '#fff' }} align="right">
              Calories
            </TableCell>
            <TableCell style={{ color: '#fff' }} align="right">
              Fat&nbsp;(g)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ color: '#fff' }} align="right">
                {row.calories}
              </TableCell>
              <TableCell style={{ color: '#fff' }} align="right">
                {row.fat}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const sumaryContent = [
  {
    size: 2,
    title: 'Call Centre Details',
    rows: [
      { label: 'Total Calls', value: 1500, labelSize: 6, valueSize: 6 },
      { label: 'Valid Calls', value: 1200, labelSize: 6, valueSize: 6 },
      { label: 'Red Flagged', value: 400, labelSize: 6, valueSize: 6 }
    ]
  },
  {
    size: 2,
    title: 'Number of Test',
    rows: [
      { label: 'New', value: 1500, labelSize: 6, valueSize: 6 },
      { label: 'Awaiting', value: 1200, labelSize: 6, valueSize: 6 },
      { label: 'TOTAL', value: 400, labelSize: 6, valueSize: 6 }
    ]
  },
  {
    size: 2,
    title: 'Positive cases',
    rows: [
      { label: 'New', value: 1500, labelSize: 6, valueSize: 6 },
      { label: 'Old', value: 1200, labelSize: 6, valueSize: 6 },
      { label: 'Total', value: 400, labelSize: 6, valueSize: 6 }
    ]
  },
  {
    size: 2,
    title: 'Positive Cases awaiting Evacuation',
    rows: [
      { label: 'Total Calls', value: 1500, labelSize: 6, valueSize: 6 },
      { label: 'Valid Calls', value: 1200, labelSize: 6, valueSize: 6 },
      { label: 'Red Flagged', value: 400, labelSize: 6, valueSize: 6 }
    ]
  },
  {
    size: 2,
    title: 'Call Centre Details',
    rows: [
      { label: 'Total Calls', value: 1500, labelSize: 6, valueSize: 6 },
      { label: 'Valid Calls', value: 1200, labelSize: 6, valueSize: 6 },
      { label: 'Red Flagged', value: 400, labelSize: 6, valueSize: 6 }
    ]
  }
];

const SummaryGrid = ({ size, rows, title, classes }) => {
  return (
    <Grid className={classes.container} item md={size} lg={size} xs={12}>
      <Grid className={classes.title}>
        <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>
          {' '}
          {title}{' '}
        </Typography>
      </Grid>
      <Grid container alignItems="center">
        {rows.map(row => {
          return (
            <Fragment key={row.label}>
              <Grid
                item
                xs={row.labelSize}
                className={[classes.content, classes.valueText].join(' ')}>
                {row.label}
              </Grid>
              <Grid
                item
                xs={row.valueSize}
                className={[classes.content, classes.valueText].join(' ')}>
                {row.value}
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    </Grid>
  );
};

const Dashboard = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // return (
  //   <Grid container>
  //     <Grid container justify="center" alignItems="center" spacing={4}>
  //       <Grid item xs={3}>
  //         <Typography> Dashboard </Typography>
  //       </Grid>
  //       <Grid item xs={6}>
  //         <Tabs
  //           value={value}
  //           onChange={handleChange}
  //           indicatorColor="primary"
  //           textColor="primary"
  //           centered>
  //           <Tab label="Overview" />
  //           <Tab label="Surveilence" />
  //           <Tab label="Case Management" />
  //           <Tab label="Laboratory" />
  //         </Tabs>
  //       </Grid>
  //       <Grid item xs={3}>
  //         <Grid container justify="flex-end">
  //           <Typography> Dashboard </Typography>
  //         </Grid>
  //       </Grid>
  //     </Grid>
  //     <Grid item lg={12} md={12} xs={12} style={{ marginTop: 20 }}>
  //       <TabPanel value={value} index={0}>
  //         <Grid container justify="center" spacing={3}>
  //           {sumaryContent.map((summary, index) => {
  //             return (
  //               <SummaryGrid
  //                 key={`${index.toString()}--${summary.title}`}
  //                 size={summary.size}
  //                 rows={summary.rows}
  //                 title={summary.title}
  //                 classes={classes}
  //               />
  //             );
  //           })}
  //         </Grid>
  //         <Grid
  //           container
  //           justify="center"
  //           style={{ marginTop: 30 }}
  //           spacing={3}
  //           xs={12}
  //           direction="row">
  //           <Grid item xs={4}>
  //             <TableTransformer />
  //           </Grid>
  //           <Grid xs={6}>
  //             <Grid></Grid>
  //             <Grid> yo</Grid>
  //           </Grid>
  //         </Grid>
  //       </TabPanel>
  //       <TabPanel value={value} index={1}>
  //         <div className="d-block p-4">
  //           <Line
  //             data={data4MultipleData}
  //             height={255}
  //             options={data4MultipleOptions}
  //           />
  //         </div>
  //       </TabPanel>
  //     </Grid>
  //   </Grid>
  // );

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>


    <Fragment>
      <div className="d-flex flex-row text-center flex-wrap justify-content-center">
        <Card className="rounded-sm card-box p-3 m-3">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ width: '150px', height: '80px' }}>
            <BarLoader color={'var(--danger)'} loading={true} />
          </div>
          <p className="mb-0 pt-3 text-black-50 text-center">Danger</p>
        </Card>

        <Card className="rounded-sm card-box p-3 m-3">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ width: '150px', height: '80px' }}>
            <BeatLoader color={'var(--first)'} loading={true} />
          </div>
          <p className="mb-0 pt-3 text-black-50 text-center">First</p>
        </Card>

        <Card className="rounded-sm card-box p-3 m-3">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ width: '150px', height: '80px' }}>
            <BounceLoader color={'var(--success)'} loading={true} />
          </div>
          <p className="mb-0 pt-3 text-black-50 text-center">Success</p>
        </Card>

        <Card className="rounded-sm card-box p-3 m-3">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ width: '150px', height: '80px' }}>
            <CircleLoader color={'var(--warning)'} loading={true} />
          </div>
          <p className="mb-0 pt-3 text-black-50 text-center">Warning</p>
        </Card>

        <Card className="rounded-sm card-box p-3 m-3">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ width: '150px', height: '80px' }}>
            <ClimbingBoxLoader color={'var(--info)'} loading={true} />
          </div>
          <p className="mb-0 pt-3 text-black-50 text-center">Info</p>
        </Card>
      </div>
    </Fragment>
      </Grid>
    </div>
  );
};

export default Dashboard;
