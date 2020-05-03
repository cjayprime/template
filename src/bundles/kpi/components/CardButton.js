import React from 'react';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const CardButton = ({
  mainColor,
  children,
  className: buttonClassName,
  ...props
}) => {
  const classes = makeStyles(theme => ({
    root: {
      boxShadow: 'none',
      borderRadius: 15,
      textTransform: 'none',
      fontSize: 14,
      padding: '4px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: mainColor,
      borderColor: mainColor,
      '&:hover': {
        backgroundColor: mainColor,
        borderColor: mainColor,
        boxShadow: 'none'
      },
      '&:active': {
        backgroundColor: mainColor,
        borderColor: mainColor,
        boxShadow: 'none'
      },
      '&:focus': {
        boxShadow: `0 0 0 0.2rem ${mainColor}`
      },
      width: '100%'
    }
  }))();
  console.log(classes.root);
  return (
    <Button className={classnames(classes.root, buttonClassName)} {...props}>
      {children}
    </Button>
  );
};

export default CardButton;
