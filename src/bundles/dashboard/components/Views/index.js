import React, { Fragment } from 'react';
import { Header } from '../../../shared/components';
import { DashboardPageStyles } from './index.style';

export const DashboardPageView = () => {
  const headerTabs = [
    'Overview',
    'Surveillance',
    'Case Management',
    'Laboratory '
  ];
  const dateSelectOptions = ['23 Apr 2020', '24 Apr 2020'];

  const handleTabChange = _ => {};
  const handleDateChange = _ => {};

  const classes = DashboardPageStyles();

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
      <div></div>
    </Fragment>
  );
};
