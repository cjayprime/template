
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  navBarHover: {
    borderLeft: '5px solid #fff',
    borderRadius: 5,
    cursor: 'pointer !important'
  },
  navBarClicked: {
    borderLeft: '5px solid #fff',
    borderRadius: 5,
    cursor: 'pointer !important'
   //backgroundColor: '#eeeff8;',
   // color: 'black'
  },
  navBarDefault: {
    borderLeft: '5px solid transparent',
    cursor: 'pointer !important'
  }

}));

