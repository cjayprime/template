
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  input: {
    padding: 20,
    fontSize: 20,
    color: '#231E1E',
    fontWeight: 'bold',
  },
  searchIcon: {
    color: '#231E1E',
    fontSize: 35
  },
  textPatient: {
    color: '#231E1E',
    fontSize: 24,
    textAlign: 'center'
  },
  text: {
    color: '#231E1E',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    color: '#fff',
    backgroundColor: '#6EA915',
    borderRadius: 32,
    width: 300,
    height: 60
  },
  roundedButton: {
    borderRadius: 50,
    backgroundColor: '#28BAC0',
    '&:hover': {
      backgroundColor: '#28BAC0'
    }
  },
  endIcon: {
    marginRight: 20,
    marginBottom: 5
  },
  roundedIcon: {
    fontSize: 35,
    color: '#fff'
  },
  iconMargin: {
    marginLeft: 20 
  },
  underline: {
    
    '&:before': {
      borderBottom: '2px solid #231E1E'
    },
    '&:hover': {
      borderBottom: '2px solid #231E1E'
    },
    '&:after': {
      borderBottom: '2px solid #231E1E'
    },
    '&:hover:not($disabled):not($focused):not($error):before': {
      borderBottom: 'none !important'
    }
  }
}));
