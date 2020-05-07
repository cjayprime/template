import React from 'react';
import { Grid, Container, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { FilterListStyles } from './index.style';

export const FilterList = props => {
  const { selector, options, dafaultValue, selectorText, styles = {} } = props;
  const classes = FilterListStyles();
  return (
    <Container
      className={clsx(classes.FilterContainer, styles.FilterContainer)}>
      <Grid container>
        <Grid item xs={4}>
          <Typography className={classes.TabCaption}>
            {selectorText ? selectorText : `Filter by ${selector}:`}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            select
            variant="filled"
            fullWidth
            className={classes.TextInputContainer}
            InputProps={{
              classes: { root: classes.InputView },
              disableUnderline: true,
              defaultValue: dafaultValue || 'Choose from list'
            }}
            SelectProps={{
              IconComponent: () => (
                <KeyboardArrowDownIcon className={classes.SelectInputIcon} />
              ),
              classes: { filled: classes.SelectInput }
            }}>
            {[{ value: 'Choose from list' }, ...options].map(opt => (
              <option value={opt.value}>{opt.value}</option>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Container>
  );
};
