import React, { Fragment } from 'react';
import { Grid, Typography, Divider } from '@material-ui/core/';
import { useStyles } from './index.style';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

export const DataTable = props => {
  const { headers, data, customRowRender } = props;
  const classes = useStyles();
  const buildHeaderCells = () => {
    return (
      <Fragment>
        {headers.map(item => (
          <TableCell>{item.name}</TableCell>
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
    return (
      <Fragment>
        {customRowRender && customRowRender(row)}
        {!customRowRender && (
          <TableRow>
            {headers.map(header => {
              return (
                <TableCell key={genKey()}>{genCellPayload(header)}</TableCell>
              );
            })}
          </TableRow>
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.Table}>
          <TableHead>
            <TableRow>{buildHeaderCells()}</TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <Row key={`item-${i}`} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

DataTable.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  customRowRender: PropTypes.func
};

DataTable.defaultProps = {
  headers: [],
  data: []
};
