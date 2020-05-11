import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Collapse, TableRow, TableCell, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  collapseTableCell: {
    padding: 0,
    borderBottom: 'none'
  },
  collapseRowGroup: {}
}));

export const CollapsibleRow = ({
  children,
  collapsibleComponent,
  collapseProps,
  onCollapseStart,
  onCollapseEnd,
  styles,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <Fragment>
      <TableBody
        className={clsx(classes.collapseRowGroup, styles.collapseRowGroup, {
          open: open
        })}>
        <TableRow
          className={clsx(styles.collapseRowParent, { open: open })}
          onClick={() => {
            setOpen(!open);
          }}
          {...props}
          hover>
          {children}
        </TableRow>
        <TableRow className={clsx(styles.collapseRowChild, { open: open })}>
          <TableCell className={classes.collapseTableCell} colSpan={12}>
            <Collapse
              in={open}
              {...collapseProps}
              onEnter={onCollapseStart}
              onExit={onCollapseEnd}>
              {collapsibleComponent}
            </Collapse>
          </TableCell>
        </TableRow>
      </TableBody>
    </Fragment>
  );
};

CollapsibleRow.propTypes = {
  children: PropTypes.element.isRequired,
  collapsibleComponent: PropTypes.element.isRequired
};
