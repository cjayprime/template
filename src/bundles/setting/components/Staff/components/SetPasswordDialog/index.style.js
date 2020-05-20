import { makeStyles } from '@material-ui/styles';

export const SetPasswordDialogStyles = makeStyles(_theme => ({
  dialog: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  dialogheaderText: {
    fontSize: 24,
    color: '#231E1E',
    textAlign: 'center'
  },
  dialogContainer: {
    backgroundColor: 'rgba(246, 246, 246, 0.7)',
    backdropFilter: 'blur(4px)'
  },
  primaryButton: {
    backgroundColor: '#CB6A00',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    borderRadius: 50,
    textTransform: 'uppercase',
    width: 150,
    boxShadow:
      '0 6px 16px rgba(204, 105, 0, 0.20), 0 2px 10px rgba(204, 105, 0, 0.10)',
    '&:hover': {
      backgroundColor: '#CB6A00',
      color: '#fff',
      fontSize: 13
    }
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#231E1E',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    borderRadius: 50,
    textTransform: 'uppercase',
    maxWidth: 270,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#fff',
      fontSize: 13,
      boxShadow: 'none'
    }
  }
}));
