import React, { Fragment } from 'react';
import { Container, Grid, TypoGraphy } from '@material-ui/core';
import clsx from 'clsx';
import { BedListPageStyles } from './index.style';
import {
  Header,
  DataTable,
  PatientMetadatum,
  SummaryBox
} from '../../../../shared/components';

export const BedListPage = props => {
  const classes = BedListPageStyles();
  const summaryNumbers = [
    {
      header: { label: 'Total # of Beds', color: '#A99FEC' },
      value: { label: '27', color: 'white' }
    },
    {
      header: { label: 'Assigned', color: '#BA9E7C' },
      value: { label: '14', color: 'white' }
    },
    {
      header: { label: 'Available', color: '#C49FA6' },
      value: { label: '4', color: 'white' }
    }
  ];

  return (
    <Fragment>
      <Header
        pageTitle={'Bed Management'}
        styles={{ RootTabsContainer: classes.HeaderTabsContainer }}
        contexts={{
          tabs: {
            tabItems: ['Yaba Center', 'Onikan Center'],
            defaultTab: 'Yaba Center',
            handleTabChange: _selectedTab => {}
          }
        }}
      />
      <Container>
        <Grid className={classes.SummaryContainer} container>
          {summaryNumbers.map(item => {
            return (
              <Grid xs={4} item key={item.header.label}>
                <SummaryBox
                  header={item.header.label}
                  value={item.value.label}
                  colors={{
                    header: item.header.color,
                    caption: item.value.color
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Fragment>
  );
};
