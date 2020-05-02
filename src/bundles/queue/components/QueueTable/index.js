import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import {
  Container,
  Typography,
  Chip,
  Grid,
  Tab,
  Tabs,
  TextField
} from '@material-ui/core';
import { DataTable } from './Table';
import { pendingStore, patientStore } from './store';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {
  pageStyles,
  TagStyles,
  teamSectionStyles,
  PatientMetadatumStyles,
  HeaderStyles
} from './index.style';

// TODO {H.Ezekiel} Refactor this to lib/shared/components
const TeamTag = ({ tagLabel, text, classes = {}, spacing }) => {
  const styles = TagStyles();
  return (
    <Grid container>
      <Grid item xs={spacing.mainText || 6}>
        <Typography
          className={clsx(styles.TextContainer, classes.TextContainer)}>
          {text}
        </Typography>
      </Grid>
      <Grid item xs={spacing.label || 6}>
        <Chip
          variant="default"
          size="small"
          color={'primary'}
          label={tagLabel}
          className={clsx(styles.ChipContainer, classes.ChipContainer)}
        />
      </Grid>
    </Grid>
  );
};

const PatientMetadatumView = props => {
  const { name, sex, age, riskLevel } = props;
  const classes = PatientMetadatumStyles(props);

  return (
    <Grid container>
      <Grid container item direction="column" xs={7}>
        <Grid item>
          <Typography className={classes.Nametext}>{name}</Typography>
        </Grid>
        <Grid item>
          <Typography
            className={
              classes.MetaCaption
            }>{`${sex}, ${age} years old`}</Typography>
        </Grid>
      </Grid>
      <Grid container item direction="column" xs={5}>
        <Chip
          variant="default"
          size="small"
          label={`${riskLevel} Risk`}
          className={classes.TagContainer}
        />
      </Grid>
    </Grid>
  );
};

const Header = () => {
  const classes = HeaderStyles();
  const [selectedTab, setSelectedTab] = useState('RRT');
  return (
    <Grid container className={classes.HeaderContainer}>
      <Grid container item xs={2}>
        <Grid item xs={6} className={classes.HeaderItem}></Grid>
        <Grid item xs={6} className={classes.HeaderItem}>
          <Typography className={classes.HeaderCaption}>{'Queue'}</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={5} className={classes.TabsContainer}>
        <Tabs
          onChange={(e, value) => setSelectedTab(value)}
          textColor="white"
          value={selectedTab}
          indicatorColor={'white'}
          classes={{
            root: classes.RootTabsContainer,
            flexContainer: classes.TabsFlexContainer,
            indicator: classes.TabIndicator
          }}>
          <Tab
            label={'RRT'}
            classes={{
              root: classes.TabContainer,
              selected: classes.SelectedTabContainer
            }}></Tab>
          <Tab
            label={'My tasks'}
            classes={{
              root: classes.TabContainer,
              selected: classes.SelectedTabContainer
            }}></Tab>
        </Tabs>
      </Grid>
      <Grid item xs={2} className={clsx(classes.HeaderItemContent)}>
        <TextField
          select
          fullWidth
          type="string"
          SelectProps={{
            IconComponent: () => (
              <KeyboardArrowDownIcon className={classes.SelectInputIcon} />
            ),
            classes: { root: classes.SelectInput }
          }}
          InputProps={{
            classes: { root: classes.DateContextInputBase },
            defaultValue: 'TODAY',
            disableUnderline: true
          }}
          classes={{
            root: classes.DateContextInput
          }}>
          {['TODAY'].map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={3} className={clsx(classes.HeaderItemContent)}>
        <TextField
          placeholder={'Search by Patient, EPID'}
          fullWidth
          InputProps={{
            classes: { root: classes.SearchContextInput },
            disableUnderline: true
          }}
        />
      </Grid>
    </Grid>
  );
};

export const QueueTableView = () => {
  const classes = pageStyles();

  const renderPatientCell = row => (
    <PatientMetadatumView
      name={`${row.patient.firstName} ${row.patient.lastName}`}
      sex={row.patient.sex}
      age={row.patient.age}
      riskLevel={row.patientCase.riskLevel}
    />
  );

  const renderTeamCell = row => {
    const classes = teamSectionStyles({ status: row.task.status });
    return (
      <TeamTag
        text={row.team.name}
        tagLabel={row.task.status}
        spacing={{ mainText: 3, label: 3 }}
        classes={classes}
      />
    );
  };

  const renderActionComponent = row => (
    <Typography className={classes.ActionButton}>{'ACCEPT'}</Typography>
  );

  const headers = [
    { name: 'PATIENT', accessor: renderPatientCell },
    { name: 'REQUEST DATE', accessor: 'task.requestDate' },
    { name: 'WAIT TIME', accessor: 'task.waitTime' },
    { name: 'TEAM', accessor: renderTeamCell },
    { name: 'ACCEPTED BY', accessor: 'task.acceptedBy' },
    { name: 'ACTION', accessor: renderActionComponent }
  ];
  const buildTables = ({ store }) => {
    return <DataTable headers={headers} data={store} />;
  };
  return (
    <Fragment>
      <Header />
      <Container className={classes.PageContainer}>
        <Container className={classes.TableContainer}>
          <Typography className={classes.TextContainer}>
            {'2 Pending'}
          </Typography>
          {buildTables({ store: pendingStore })}
        </Container>

        <Container className={classes.TableContainer}>
          <Typography className={classes.TextContainer}>
            {'6 Patients'}
          </Typography>
          {buildTables({ store: patientStore })}
        </Container>
      </Container>
    </Fragment>
  );
};
