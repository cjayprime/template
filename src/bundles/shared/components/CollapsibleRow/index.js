import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Collapse, TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  collapseTableCell: {
    padding: 0,
    borderBottom: 'none'
  }
}));

export const CollapsibleRow = ({
  children,
  collapsibleComponent,
  collapseProps,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <Fragment>
      <TableRow
        onClick={() => {
          setOpen(!open);
        }}
        {...props}
        hover>
        {children}
      </TableRow>
      <TableRow>
        <TableCell className={classes.collapseTableCell} colSpan={12}>
          <Collapse in={open} {...collapseProps}>
            {collapsibleComponent}
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

CollapsibleRow.propTypes = {
  children: PropTypes.element.isRequired,
  collapsibleComponent: PropTypes.element.isRequired
};
