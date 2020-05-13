import React from 'react';
import { Grid, Typography, Chip } from '@material-ui/core';
import { PatientMetadatumStyles } from './index.style';

export const PatientMetadatum = props => {
  const { name, sex, age, riskLevel, textRowDirection } = props;
  const classes = PatientMetadatumStyles(props);
  return (
    <Grid container >
      <Grid container item direction={textRowDirection || 'column'} xs={7}>
        <Grid item>
          <Typography className={classes.Nametext}>{name}</Typography>
        </Grid>
        <Grid item>
          <Typography
            className={
              classes.MetaCaption
            }>{`${sex}`}
          </Typography>
          <Typography
            className={
              classes.MetaCaption
            }>{age ?  `${age} years old`: '' }
          </Typography>
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
