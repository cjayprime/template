import React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import {
  ChartHolder,
  DataContainerWithMetadata,
  DataContainer,
  DataTable
} from '../../../../../shared/components/';
import { OverviewPageStyles } from './index.style';
import { basicInfoStore, SectionTwoStore, Legends, TableData } from './store';

export const Overview = () => {
  const classes = OverviewPageStyles();
  const headers = [
    { name: 'S/M', accessor: 'S/M' },
    { name: 'LGA', accessor: 'LGA' },
    { name: 'Number', accessor: 'count' }
  ];
  return (
    <Grid direction="column" container>
      <Grid
        item
        container
        direction="row"
        wrap="nowrap"
        className={clsx(classes.PageItem, classes.OverviewFlexContainer)}>
        {basicInfoStore.map(info => (
          <Grid container item xs={2.5}>
            <DataContainerWithMetadata {...info} />
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        container
        className={clsx(classes.PageItem, classes.SectionTwo)}>
        <Grid item xs={5}>
          <DataContainer styles={{ BaseContainer: classes.TableContainer }}>
            <DataTable
              headers={headers}
              data={TableData}
              styles={{
                Table: classes.Table,
                TableCell: classes.TableCell
              }}
            />
          </DataContainer>
        </Grid>
        <Grid item direction="column" xs={7}>
          <Grid item container>
            <Grid item xs={8}>
              <DataContainerWithMetadata
                {...{
                  ...SectionTwoStore.Admissions,
                  entryDirection: 'row',
                  itemSpacing: 6,
                  styles: {
                    SummaryHeaderContainer: classes.LargeSummaryHolder,
                    EntryHolder: classes.LargeEntryHolder
                  }
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <DataContainerWithMetadata
                {...{ ...SectionTwoStore.DischargedPatients }}
              />
            </Grid>
          </Grid>
          <Grid item className={classes.EpidInfoContainer}>
            <ChartHolder
              title="Epidemiology curve"
              styles={{
                BaseContainer: classes.EpidInfoLegend
              }}
              legend={{
                entries: Legends.epidCurve,
                position: 'top'
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
