import { makeStyles } from '@material-ui/styles';

export const SetPasswordDialogStyles = makeStyles(_theme => ({
  ContentContainer: {
    backgroundColor: '#3A3C4F',
    width: '40vw'
  },
  MainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '.MuiPaper-root': {
      backgroundColor: '#3A3C4F'
    }
  },
  DialogTitle: {
    padding: '3%',
    color: 'white',
    fontSize: '15px',
    fontWeight: 'bold',
    backgroundColor: '#3A3C4F'
  },
  DialogAction: {
    backgroundColor: '#3A3C4F'
  },
}))
