import React from 'react';
import classnames from 'classnames';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CardButton from './CardButton';

const useStyles = makeStyles(theme => ({
  card: {
    transition: '0.3s',
    overflow: 'initial',
    background: '#fff',
    // background: 'rgb(58, 60, 78)',
    padding: '1em',
    paddingLeft: 6,
    paddingRight: 6
  },
  cardAction: {
    paddingLeft: '0',
    paddingRight: '0',
    width: '100%'
  },
  textBody: {
    color: '#231E1E',
    paddingBottom: 20,
    minHeight: 80
  },
  textCount: {
    color: '#6EA915',
    // color: 'white',
    fontWeight: 700,
    fontSize: 50
  },
  button: {
    margin: '0 auto -20%'
  }
}));

export default ({ text, count, buttonColor, buttonContent, buttonOnClick }) => {
  const classes = useStyles();
  return (
    <Card className={classnames('card-box text-black-50 mb-4', classes.card)}>
      <CardContent>
        <Typography
          variant="body1"
          align="center"
          className={classes.textBody}
          gutterBottom>
          {text}
        </Typography>
        <Typography
          variant="h1"
          align="center"
          className={classes.textCount}
          component="h2">
          {count}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <CardButton
          className={classnames(classes.button, classes.buttonPupple)}
          size="medium"
          variant="contained"
          color="secondary"
          mainColor={buttonColor}
          onClick={buttonOnClick}
          disableElevation>
          {buttonContent}
        </CardButton>
      </CardActions>
    </Card>
  );
};
