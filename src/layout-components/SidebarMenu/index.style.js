
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  navBarHover: {
    // borderLeft: '5px solid #fff',
    // borderRadius: 5,
    cursor: 'pointer !important',
    position: 'relative',
    '&:before': {
      position: 'absolute',
      content: '""',
      height: '50%',
      width: 5,
      left: 0,
      top: '25%',
      backgroundColor: '#fff',
      borderTopRightRadius: '50% 40%',
      borderBottomRightRadius: '50% 30%'
    }
  },
  navBarClicked: {
    cursor: 'pointer !important',
    '&:before': {
      position: 'absolute',
      content: '""',
      height: '50%',
      width: 5,
      left: 0,
      top: '25%',
      backgroundColor: '#fff',
      borderTopRightRadius: '50% 40%',
      borderBottomRightRadius: '50% 30%'
    }
  },
  navBarDefault: {
    // borderLeft: '5px solid transparent',
    cursor: 'pointer !important'
  }
}));

