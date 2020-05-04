
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  input: {
    padding: 20,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  searchIcon: {
    color: '#fff',
    fontSize: 35
  },
  textPatient: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center'
  },
  text: {
    color: '#6A6981',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    color: '#fff',
    backgroundColor: '#7768CB',
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
      borderBottom: '1px solid #6A6981'
    },
    '&:hover': {
      borderBottom: '1px solid #6A6981'
    },
    '&:after': {
      borderBottom: '1px solid #6A6981'
    },
    '&:hover:not($disabled):not($focused):not($error):before': {
      borderBottom: 'none !important'
    }
  }
}));