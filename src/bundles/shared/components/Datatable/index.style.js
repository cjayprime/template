
import { makeStyles } from '@material-ui/core/styles';

export const tableStyles = makeStyles(theme => ({
  TableContainer: {
    backgroundColor: '#2C2E42'
  },
  root: {
    borderBottom: "none"
  },
  HeaderRow: {
    borderBottom: 'none'
  },
  Table: {
    backgroundColor: '#2C2E42',
    border: 'none',
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
