import React from 'react';
import clsx from 'clsx';
import { Grid, Typography } from '@material-ui/core';
import { ChartHolderStyles } from './index.style';

export const ChartHolder = props => {
  const classes = ChartHolderStyles();
  const {
    _data,
    legend: { entries, position },
    title,
    footerText,
    styles = {}
  } = props;

  const Legend = () => {
    return (
      <Grid
        item
        container
        className={clsx(classes.LegendContainer, styles.LegendContainer)}>
        {entries.map(entry => {
          return (
            <Grid
              item
              container
              xs={position === 'top' || footerText ? 5 : 12}
              className={clsx(classes.LegendContainer, styles.LegendContainer)}
              style={{ color: entry.color }}>
              <Grid item xs={4} className={clsx(classes.LegendIconContainer)}>
                {entry.icon}
              </Grid>
              <Grid
                item
                xs={8}
                className={clsx(
                  classes.LegendTextContainer,
                  styles.LegendTextContainer
                )}>
                <Typography
                  className={clsx(classes.LegendText, styles.LegendText)}>
                  {entry.name}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    );
  };
  return (
    <Grid
      container
      directionclassName={clsx(classes.BaseContainer, styles.BaseContainer)}>
      <Grid
        item
        container
        className={clsx(classes.HeaderSection, styles.HeaderSection)}>
        <Grid item xs={position && position === 'top' ? 7 : 12}>
          <Typography className={clsx(classes.HeaderText, styles.HeaderText)}>
            {title}
          </Typography>
        </Grid>
        {position && position === 'top' && <Legend />}
      </Grid>
      <Grid item className={clsx(classes.ChartSection, styles.ChartSection)}>
        {/* Charts go in here */}
      </Grid>
      {(footerText || position === 'bottom') && (
        <Grid
          container
          item
          className={clsx(classes.FooterSection, styles.FooterSection)}>
          {footerText && (
            <Grid
              item
              xs={5}
              className={clsx(
                classes.FooterTextContainer,
                styles.FooterTextContainer
              )}>
              <Typography
                className={clsx(classes.FooterText, styles.FooterText)}>
                {footerText}
              </Typography>
            </Grid>
          )}
          {position === 'bottom' && <Legend />}
        </Grid>
      )}
    </Grid>
  );
};
