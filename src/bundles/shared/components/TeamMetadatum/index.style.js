import { makeStyles } from '@material-ui/core/styles';

const DEFAULT_GREY = '#8E8CA7';

export const TeamMetadatumStyles = makeStyles(theme => {
  const yieldBackgroundColor = props => {
    const { tagLabel } = props;
    const statusColorMap = {
      'Awaiting sample pickup': '#FFEFD8',
      'Sample Collected': '#8EE2E5',
      'Sample Delivered': '#8EE2E5',
      'Appointment Booked': '#8EE2E5',
      'Awaiting appointment': 'rgb(255, 91, 103)', 
    };
    return statusColorMap[tagLabel] || DEFAULT_GREY;
  };

  const yieldForegroundColor = props => {
    const { tagLabel } = props;
    const statusColorMap = {
      'Awaiting appointment': '#fff', 
    };

    return statusColorMap[tagLabel] || 'rgb(44, 46, 66);'
  }

  return {
    TextContainer: {
      color: 'inherit'
    },
    ChipContainer: props => ({
      height: '20px',
      color: yieldForegroundColor(props),
      fontSize: '10px',
      fontWeight: 'bold',
      backgroundColor: yieldBackgroundColor(props)
    })
  };
});
