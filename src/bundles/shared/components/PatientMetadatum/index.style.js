import { makeStyles } from '@material-ui/core/styles';

const DEFAULT_GREY = '#8E8CA7';
const DEFAULT_GREEN = '#80C9CE';

export const PatientMetadatumStyles = makeStyles(theme => {
  const backdropColor = props => {
    const { riskLevel } = props;
    const statusColorMap = {
      high: '#ED666B',
      medium: '#9D3732',
      no: '#CACACA'
    };
    return statusColorMap[riskLevel.toLowerCase()] || DEFAULT_GREY
  };
  return {
    Nametext: {
      color: '#EFA14B',
      fontWeight: 'bold',
      fontSize: `14px`,
      cursor: 'pointer'
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
      color: props.riskLevel.toLowerCase() === 'no' ? '#231E1E' : 'white',
    })
  };
});
