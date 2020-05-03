import React, { Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { tableStyles } from './index.style';
import { CollapsibleRow } from '../CollapsibleRow';

export const DataTable = props => {
  const { headers, data, customRowRender, renderCollapsible } = props;
  const classes = tableStyles();
  const buildHeaderCells = () => {
    return (
      <Fragment>
        {headers.map(item => (
          <TableCell className={classes.TableCell}>{item.name}</TableCell>
        ))}
      </Fragment>
    );
  };

  const Row = ({ row }) => {
    const genKey = () =>
      Math.random()
        .toString(36)
        .substr(2, 5);

    const reduceResponse = str => {
      const indices = str.split('.');
      if (indices.length < 2) return row[str];
      return indices.reduce((sum, current) => {
        if (indices.indexOf(current) === 0) {
          sum = row[current];
        } else {
          sum = sum[current];
        }
        return sum;
      }, {});
    };

    const genCellPayload = header => {
      const { name, accessor } = header;
      switch (typeof accessor) {
        case 'string':
          return reduceResponse(accessor);
        case 'function':
          return accessor(row);
        default:
          return row[name];
      }
    };
    const CustomTableRow = renderCollapsible ? CollapsibleRow : TableRow;
    return (
      <Fragment>
        {customRowRender ? (
          customRowRender(row)
        ) : (
          <CustomTableRow
            collapsibleComponent={renderCollapsible && renderCollapsible(row)}>
            {headers.map(header => {
              return (
                <TableCell
                  className={clsx(classes.TableCell, classes.TableItem)}
                  key={genKey()}>
                  {genCellPayload(header)}
                </TableCell>
              );
            })}
          </CustomTableRow>
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Table className={classes.Table}>
        <TableHead>
          <TableRow className={classes.HeaderRow}>
            {buildHeaderCells()}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <Row key={`item-${i}`} row={row} />
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
};

DataTable.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  customRowRender: PropTypes.func,
  renderCollapsible: PropTypes.func
};

DataTable.defaultProps = {
  headers: [],
  data: []
};
