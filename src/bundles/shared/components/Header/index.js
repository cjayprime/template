import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import { Grid, Tabs, Typography, Tab, TextField, ButtonBase } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Link } from 'react-router-dom'
import { HeaderStyles } from './index.style';

export const Header = ({ pageTitle, contexts, pageIcon, styles = {}, actionButton }) => {
  const classes = HeaderStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [dateSelectInput, setDateSelectInput] = useState('');
  // select RRT tab on mount

  const renderSearch = ({ context }) => {
    const handleSearchInputChange = (_, newValue) => {
      setSearchInput(newValue);
      context.handleInputChange(newValue);
    };
    return (
      <Grid
        item
        xs={context.spacing || 2}
        className={clsx(classes.HeaderItemContent)}>
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
      <Grid
        item
        xs={context.spacing || 2}
        className={clsx(classes.HeaderItemContent)}>
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
        <Grid
          container
          item
          xs={context.spacing || 5}
          className={clsx(classes.TabsContainer, styles.TabsContainer)}>
          <Tabs
            onChange={handleSelectTab}
            value={selectedTab}
            defaultValue={0}
            classes={{
              root: clsx(classes.RootTabsContainer, styles.RootTabsContainer),
              flexContainer: classes.TabsFlexContainer,
              indicator: classes.TabIndicator
            }}>
            {context.tabItems.map((tab, index) => (
              <Tab
                label={tab}
                selected={selectedTab === index}
                classes={{
                  root: clsx(classes.TabContainer, styles.TabContainer),
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
    <Grid container className={clsx(classes.HeaderContainer, styles.root)}>
      <Grid container item xs={3}>
        <Grid item xs={3} className={classes.HeaderItem}>
          {pageIcon && pageIcon}
        </Grid>
        <Grid item xs={9} className={classes.HeaderItem}>
          <Typography className={classes.HeaderCaption}>{pageTitle}</Typography>
        </Grid>
      </Grid>
      {Object.keys(contexts).map(context => contextsMap[context]())}
      {actionButton ?  <Grid xs={6} container  justify="flex-end" > {actionButton } </Grid> : null}
    </Grid>
  );
};
