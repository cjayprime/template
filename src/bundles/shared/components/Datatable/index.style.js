import { makeStyles } from '@material-ui/core/styles';

export const tableStyles = makeStyles(theme => ({
  TableContainer: {
    backgroundColor: '#F6F6F6'
  },
  root: {
    borderBottom: 'none'
  },
  HeaderRow: {
    borderBottom: 'none'
  },
  Table: {
    backgroundColor: '#F6F6F6',
    border: 'none',
  },
  TableCell: {
    color: '#8F8D8C',
    borderBottom: '.5px solid #E5E5E5'
  },
  TableCellNoBorder: {
    color: '#8E8CA7',
    borderBottom: 'none'
  },
  TableItem: {
    color: '#231E1E'
  }
}));



