import React from 'react';
import clsx from 'clsx';
import { Grid, Typography, Container } from '@material-ui/core';
import { ChartHolderStyles } from './index.style';

export const ChartHolder = props => {
  const classes = ChartHolderStyles();
  const { _data, legend = {}, title, footerText, styles = {} } = props;
  const { entries, position, spacing = 2 } = legend;

  const Legend = () => {
    if (!Object.keys(legend).length) return null;

    return (
      <Container
        className={clsx(classes.LegendContainer, styles.LegendContainer)}>
        <Grid item container>
          {entries.map(entry => {
            return (
              <Grid
                item
                container
                wrap="nowrap"
                xs={spacing}
                className={clsx(classes.LegendHolder, styles.LegendHolder)}
                style={{ color: entry.color }}>
                {entry.icon && (
                  <Grid
                    item
                    xs={2}
                    className={clsx(classes.LegendIconContainer)}>
                    {entry.icon}
                  </Grid>
                )}
                <Grid
                  item
                  xs={10}
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
      </Container>
    );
  };
  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      className={clsx(classes.BaseContainer, styles.BaseContainer)}>
      <Grid
        item
        container
        className={clsx(classes.HeaderSection, styles.HeaderSection)}>
        <Grid item xs={position && position === 'top' ? 4 : 12}>
          <Typography className={clsx(classes.HeaderText, styles.HeaderText)}>
            {title}
          </Typography>
        </Grid>
        {position && position === 'top' && (
          <Grid
            item
            xs={8}
            className={clsx(
              classes.HeaderLegendContainer,
              styles.HeaderLegendContainer
            )}>
            <Legend />
          </Grid>
        )}
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
          {position === 'bottom' && (
            <Grid
              item
              xs={footerText ? 7 : 12}
              className={clsx(
                classes.FooterLegendContainer,
                styles.FooterLegendContainer
              )}>
              <Legend />
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
};
