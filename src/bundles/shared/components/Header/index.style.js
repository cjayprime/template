import { makeStyles } from '@material-ui/core/styles';

// TODO{H.Ezekiel} Let's export this
const DEFAULT_GREEN = '#80C9CE';
const DEFAULT_GREY = '#8E8CA7';

export const HeaderStyles = makeStyles(theme => ({
  HeaderContainer: {
    position: 'fixed',
    top: '-103px' //TODO{H.Ezekiel} we should not need to do this
  },
  HeaderItem: {
    padding: `${theme.spacing(2)}px`,
    color: 'white'
  },
  HeaderItemContent: {
    padding: '1.5%'
  },
  HeaderCaption: {
    fontSize: '15px',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  TabsContainer: {
    position: 'relative',
    top: '5px'
  },
  TabsFlexContainer: {
    justifyContent: 'space-evenly'
  },
  RootTabsContainer: {
    color: 'white',
    width: '40%'
  },
  TabIndicator: {
    color: 'white',
    backgroundColor: 'white'
  },
  TabContainer: {
    color: DEFAULT_GREEN,
    textTransform: 'none',
    minWidth: '32px',
    fontSize: '14px'
  },
  SelectedTabContainer: {
    color: 'white'
  },
  SelectInput: {
    justifyContent: 'flex-end',
    padding: 0,
    paddingRight: '3px !important',
    textAlign: 'end'
  },
  DateContextInput: {
    width: '90%',
    color: DEFAULT_GREEN,
    paddingRight: `${theme.spacing(1)}px`,
    borderRight: `.5px solid #FDFDFE70`
  },
  DateContextInputBase: {
    color: DEFAULT_GREEN,
    fontWeight: '800',
    fontSize: '14px',
    textTransform: 'uppercase',
    '&:before': {
      borderBottom: 'none'
    }
  },
  SelectInputIcon: {
    color: DEFAULT_GREY
  },
  SearchContextInput: {
    color: DEFAULT_GREY,
    fontSize: '13px',
    width: '100%',
    position: 'relative',
    bottom: `${theme.spacing(0.4)}px`,
    right: `${theme.spacing(3)}px`,
    textTransform: 'capitalize'
  }
}));
