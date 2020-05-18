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
    color: '#231E1E',
    fontSize: 25,
    marginBottom: 40
  },
  icon: {
    paddingTop: 5,
    color: '#231E1E'
  },
  buttonGroup: {
    height: 70,
    border: '2px solid #E6E5E5',
    marginBottom: 50
  },
  button: {
    border: 'none',
    fontSize: 16,
    color: '#8E8CA7',
    '&:hover': {
      border: 'none',
      backgroundColor: '#6EA915',
      '&> span p': {
        color: '#fff !important'
      }
    }
  },
  selectedButton: {
    border: 'none',
    fontSize: 16,
    backgroundColor: '#6EA915',
    '&:hover': {
      border: 'none',
      backgroundColor: '#6EA915',
      color: '#fff !important'
    }
  },
  buttonText: {
    color: '#231E1E !important'
  },
  selectedButtonText: {
    color: '#fff'
  },
  regLabelText: {
    fontSize: 20,
    color: '#231E1E'
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
      backgroundColor: '#CB6A00'
    },
    width: 250,
    height: 50
  },
  regButtons: {
    color: '#fff',
    borderRadius: 32,
    backgroundColor: '#CB6A00',
    width: 250,
    height: 50,
    '&:hover': {
      backgroundColor: '#CB6A00'
    }
  }
}));
