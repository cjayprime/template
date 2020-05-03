import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import { Grid, Tabs, Typography, Tab, TextField } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { HeaderStyles } from './index.style';

export const Header = ({ pageTitle, contexts, pageIcon }) => {
  const classes = HeaderStyles();
  const [selectedTab, setSelectedTab] = useState('RRT');
  const [searchInput, setSearchInput] = useState('');
  const [dateSelectInput, setDateSelectInput] = useState('');
  // select RRT tab on mount

  const renderSearch = ({ context }) => {
    const handleSearchInputChange = (_, newValue) => {
      setSearchInput(newValue);
      context.handleInputChange(newValue);
    };
    return (
      <Grid item xs={3} className={clsx(classes.HeaderItemContent)}>
        <TextField
          placeholder={context.placeholder}
          fullWidth
          onChange={handleSearchInputChange}
          value={searchInput}
          InputProps={{
            classes: { root: classes.SearchContextInput },
            disableUnderline: true
          }}
        />
      </Grid>
    );
  };

  const renderDateSelect = ({ context }) => {
    const handleSelectInput = (_, newValue) => {
      setDateSelectInput(newValue);
      context.handleInputChange(newValue);
    };

    return (
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
            defaultValue: context.defaultValue,
            disableUnderline: true
          }}
          classes={{
            root: classes.DateContextInput
          }}>
          {context.options.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </TextField>
      </Grid>
    );
  };

  const renderTabs = ({ context }) => {
    const handleSelectTab = (_, tab) => {
      setSelectedTab(tab);
      context.handleTabChange(tab);
    };

    return (
      <Fragment>
        <Grid container item xs={5} className={classes.TabsContainer}>
          <Tabs
            onChange={handleSelectTab}
            value={selectedTab}
            defaultValue={context.defaultTab}
            classes={{
              root: classes.RootTabsContainer,
              flexContainer: classes.TabsFlexContainer,
              indicator: classes.TabIndicator
            }}>
            {context.tabItems.map(tab => (
              <Tab
                label={tab}
                classes={{
                  root: classes.TabContainer,
                  selected: classes.SelectedTabContainer
                }}
              />
            ))}
          </Tabs>
        </Grid>
      </Fragment>
    );
  };

  const contextsMap = {
    search: () => renderSearch({ context: contexts.search }),
    dateSelect: () => renderDateSelect({ context: contexts.dateSelect }),
    tabs: () => renderTabs({ context: contexts.tabs })
  };

  return (
    <Grid container className={classes.HeaderContainer}>
      <Grid container item xs={2}>
        <Grid item xs={6} className={classes.HeaderItem}>
          {pageIcon && pageIcon}
        </Grid>
        <Grid item xs={6} className={classes.HeaderItem}>
          <Typography className={classes.HeaderCaption}>{pageTitle}</Typography>
        </Grid>
      </Grid>
      {Object.keys(contexts).map(context => contextsMap[context]())}
    </Grid>
  );
};
