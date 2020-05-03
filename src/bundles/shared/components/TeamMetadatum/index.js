import React from 'react';
import { Grid, Typography, Chip } from '@material-ui/core';
import clsx from 'clsx';
import { TeamMetadatumStyles } from './index.style';

export const TeamMetadatum = ({
  tagLabel,
  text,
  styles = {},
  spacing,
  status
}) => {
  const classes = TeamMetadatumStyles({ tagLabel });
  return (
    <Grid container>
      <Grid item xs={spacing.mainText || 6}>
        <Typography className={clsx(classes.TextContainer)}>{text}</Typography>
      </Grid>
      <Grid item xs={spacing.label || 6}>
        <Chip
          variant="default"
          size="small"
          color={'primary'}
          label={tagLabel}
          className={clsx(classes.ChipContainer)}
        />
      </Grid>
    </Grid>
  );
};
