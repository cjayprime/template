import { makeStyles } from '@material-ui/core/styles';

const DEFAULT_GREEN = '#80C9CE';

export const QueuePageStyles = makeStyles(theme => ({
  PageContainer: {},
  TextContainer: {
    color: '#FDFDFE',
    marginBottom: `${theme.spacing(2)}px`
  },
  TableContainer: {
    marginBottom: `${theme.spacing(4)}px`
  },
  ActionButton: {
    color: DEFAULT_GREEN,
    fontWeight: '800',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  ViewButton : {
    color: 'rgb(101, 80, 190)',
    fontWeight: '800',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));
