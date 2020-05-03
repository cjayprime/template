import { makeStyles } from '@material-ui/core/styles';

const DEFAULT_GREY = '#8E8CA7';

export const TeamMetadatumStyles = makeStyles(theme => {
  const yieldBackgroundColor = props => {
    const { tagLabel } = props;
    const statusColorMap = {
      'Awaiting sample pickup': '#FFEFD8',
      'Sample Collected': '#8EE2E5'
    };
    return statusColorMap[tagLabel] || DEFAULT_GREY;
  };

  return {
    TextContainer: {
      color: 'inherit'
    },
    ChipContainer: props => ({
      height: '20px',
      fontSize: '10px',
      fontWeight: 'bold',
      backgroundColor: yieldBackgroundColor(props)
    })
  };
});
