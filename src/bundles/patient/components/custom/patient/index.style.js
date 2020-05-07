import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  },
  container: {
    minHeight: 600
    //maxheight: 300
  },
  childGrid: {
    padding: theme.spacing(2)
  },
  text: {
    color: '#d7d7d7',
    fontSize: 25,
    textAlign: 'center',
    marginLeft: 20
  },
  labelText: {
    fontSize: 12
  },
  description: {
    marginTop: 25,
    color: '#dad9e1',
    fontSize: 25,
    marginBottom: 40
  },
  icon: {
    paddingTop: 5,
    color: '#fff'
  },
  buttonGroup: {
    height: 70,
    border: '2px solid #7868CA',
    marginBottom: 50
  },
  button: {
    border: '2px solid transparent',
    fontSize: 16,
    color: '#8E8CA7'
  },
  buttons: {
    fontSize: 16,
    color: '#8E8CA7',
    backgroundColor: '#7868CA',
    '&:hover': {
      backgroundColor: '#7868CA'
    }
  },
  regLabelText: {
    fontSize: 20,
    color: '#fff'
  },
  regContainer: {
    marginTop: 26,
  },
  regIcon: {
    color: '#ff'
  },
  regButton: {
    color: '#fff',
    borderRadius: 32,
    '&:hover': {
      backgroundColor: '#FF5B66'
    },
    width: 250,
    height: 50
  },
  regButtons: {
    color: '#fff',
    borderRadius: 32,
    backgroundColor: '#28BAC0',
    width: 250,
    height: 50
  }
}));
