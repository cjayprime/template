import { makeStyles } from '@material-ui/core/styles';

// TODO Refactor these colors to the theme

const DEFAULT_TAG_COLOR = '#8E8CA7';
const DEFAULT_GREEN = '#80C9CE';
const DEFAULT_GREY = '#8E8CA7';

export const tableStyles = makeStyles(theme => ({
  TableContainer: {
    backgroundColor: '#2C2E42'
  },
  HeaderRow: {
    borderBottom: 'none'
  },
  Table: {
    backgroundColor: '#2C2E42',
    border: 'none'
  },
  TableCell: {
    color: '#8E8CA7',
    borderBottom: '.5px solid #3A3B4F'
  },
  TableItem: {
    color: '#FDFDFE'
  }
}));

export const pageStyles = makeStyles(theme => ({
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
  }
}));

export const PatientMetadatumStyles = makeStyles(theme => {
  const backdropColor = props => {
    const { riskLevel } = props;
    const statusColorMap = {
      High: '#FF5B67',
      Medium: '#EEBEC2',
      No: '#3A3C4F'
    };
    return statusColorMap[riskLevel] || DEFAULT_TAG_COLOR;
  };
  return {
    Nametext: {
      color: DEFAULT_GREEN,
      fontWeight: 'bold',
      fontSize: `14px`
    },
    MetaCaption: {
      color: '#8E8CA7',
      fontSize: `12px`
    },
    TagContainer: props => ({
      backgroundColor: backdropColor(props),
      height: '18px',
      fontSize: '10px',
      display: 'flex',
      justifyContent: 'center',
      fontWeight: 'bold',
      maxWidth: '70px',
      color: props.riskLevel === 'Medium' ? '#2C2E42' : 'white'
    })
  };
});

export const TagStyles = makeStyles(theme => ({
  TextContainer: {
    color: 'inherit'
  },
  ChipContainer: {
    height: '20px',
    fontSize: '10px',
    fontWeight: 'bold'
  }
}));

export const teamSectionStyles = makeStyles(theme => {
  const yieldBackgroundColor = props => {
    const { status } = props;
    const statusColorMap = {
      'Awaiting sample pickup': '#FFEFD8',
      'Sample Collected': '#8EE2E5'
    };
    return statusColorMap[status] || DEFAULT_TAG_COLOR;
  };

  return {
    ChipContainer: props => ({
      backgroundColor: yieldBackgroundColor(props)
    })
  };
});

export const HeaderStyles = makeStyles(theme => ({
  HeaderContainer: {
    position: 'fixed',
    top: '-13%' //TODO{H.Ezekiel} we should not need to do this
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
      borderBottom: 'none',
    }
  },
  SelectInputIcon: {
    color: DEFAULT_GREY
  },
  SearchContextInput: {
    color: DEFAULT_GREY,
    fontSize: '16px',
    position: 'relative',
    bottom: `${theme.spacing(0.5)}px`,
    right: `${theme.spacing(2)}px`,
    textTransform: 'capitalize',
  }
}));
