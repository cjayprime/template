import { makeStyles } from '@material-ui/core/styles';

const DEFAULT_GREEN = '#80C9CE';

export const BedListPageStyles = makeStyles(theme => ({
  PageContainer: {},
  SummaryContainer: {
    marginBottom: '7%'
  },
  TableContainer: {},
  HeaderTabsContainer: {
    width: '100% !important',
    height: '50px !important'
  },
  ActionButton: {
    color: DEFAULT_GREEN,
    fontWeight: '800',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));
