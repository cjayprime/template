import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Collapse, TableRow, TableCell } from '@material-ui/core';

export const CollapsibleRow = ({
  children,
  collapsibleComponent,
  collapseProps,
  ...props
}) => {
  const [open, setOpen] = useState(false);

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
        <TableCell padding={'none'} colSpan={12}>
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
