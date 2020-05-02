import { makeStyles } from '@material-ui/core/styles';

// TODO Refactor these colors to the theme

const DEFAULT_TAG_COLOR = '#8E8CA7';

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
  ActionButton: {
    color: '#80C9CE',
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
      color: '#80C9CE',
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
      color:
        props.riskLevel === 'Medium'
          ? '#2C2E42'
          : 'white'
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
