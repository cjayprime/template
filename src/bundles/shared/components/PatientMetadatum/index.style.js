import { makeStyles } from '@material-ui/core/styles';

const DEFAULT_GREY = '#8E8CA7';
const DEFAULT_GREEN = '#80C9CE';

export const PatientMetadatumStyles = makeStyles(theme => {
  const backdropColor = props => {
    const { riskLevel } = props;
    const statusColorMap = {
      High: '#FF5B67',
      Medium: '#EEBEC2',
      No: '#3A3C4F'
    };
    return statusColorMap[riskLevel] || DEFAULT_GREY
  };
  return {
    Nametext: {
      color: DEFAULT_GREEN,
      fontWeight: 'bold',
      fontSize: `14px`
    },
    MetaCaption: {
      color: '#8E8CA7',
      fontSize: 14
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
