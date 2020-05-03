import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Collapse, TableRow } from '@material-ui/core';

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
      <Collapse in={open} {...collapseProps}>
        {collapsibleComponent}
      </Collapse>
    </Fragment>
  );
};

CollapsibleRow.propTypes = {
  children: PropTypes.element.isRequired,
  collapsibleComponent: PropTypes.element.isRequired
};
