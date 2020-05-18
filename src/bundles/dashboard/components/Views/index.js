import React, { Fragment, useState } from 'react';
import { Header } from '../../../shared/components';
import { Container } from '@material-ui/core';
import { DashboardPageStyles } from './index.style';

import Overview from './sections/Overview';
import CaseManagement from './sections/CaseManagement';
import Laboratory from './sections/Laboratory';
import Surveillance from './sections/Surveillance';

const compose = require('lodash')?.flowRight;

const DashboardPageView = () => {
  const headerTabs = [
    'Overview',
    'Surveillance'
    // 'Case Management',
    // 'Laboratory '
  ];
  const dateSelectOptions = ['23 Apr 2020', '24 Apr 2020'];
  const [selectedView, setSelectView] = useState(0);

  const handleTabChange = newTab => setSelectView(newTab);

  const handleDateChange = _ => {};

  const classes = DashboardPageStyles();
  // const pages = [Overview, Surveillance, CaseManagement, Laboratory];
  const pages = [Overview, Surveillance];
  return (
    <Fragment>
      <Header
        pageTitle="Dashboard"
        contexts={{
          tabs: {
            tabItems: headerTabs,
            defaultTab: headerTabs[0],
            handleTabChange,
            spacing: 7
          },
          dateSelect: {
            defaultValue: dateSelectOptions[0],
            options: dateSelectOptions,
            handleInputChange: handleDateChange,
            spacing: 2
          }
        }}
        styles={{
          root: classes.Header,
          RootTabsContainer: classes.TabsContainer,
          TabContainer: classes.TabContainer
        }}
      />
      <Container className={classes.MainPageContainer}>
        {pages.map((Section, index) => {
          return <Fragment>{selectedView === index && <Section />}</Fragment>;
        })}
      </Container>
    </Fragment>
  );
};

export default DashboardPageView;
