import React from 'react';
import { Grid } from '@material-ui/core';
import Search from 'bundles/patient/components/custom/filter/search';
import List from 'bundles/patient/components/custom/filter/list';

const Panel = () => {
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Search />
          <List />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Panel;
