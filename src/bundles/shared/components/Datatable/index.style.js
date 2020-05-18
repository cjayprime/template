import { makeStyles } from '@material-ui/core/styles';

export const tableStyles = makeStyles(theme => ({
  TableContainer: {
    backgroundColor: '#ffffff'
  },
  root: {
    borderBottom: 'none'
  },
  HeaderRow: {
    borderBottom: 'none'
  },
  Table: {
    backgroundColor: '#ffffff',
    border: 'none'
  },
  TableCell: {
    color: '#8E8CA7',
    borderBottom: '.5px solid #3A3B4F'
  },
  TableCellNoBorder: {
    color: '#8E8CA7',
    borderBottom: 'none'
  },
  TableItem: {
    color: '#FDFDFE'
  }
}));
