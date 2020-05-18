import { makeStyles } from '@material-ui/styles';

export const StaffPageStyles = makeStyles(theme => ({
  PageContainer: {
    color: 'white',
    //width: '100vw'
  },
  ButtonContainer: {
    marginBottom: '3%'
  },
  Avatar: {},
  AddButtonContainer: {
    justifyContent: 'flex-end'
  },
  StaffNumberText: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#231E1E'
  },
  AddNewStaffButton: {
    width: '20%',
    float: 'right',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#EFA14B',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  },
  ActionContainer: {},
  ActionContainerItem: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#EFA14B',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  },
  DeactivateButton: {
    color: '#ED666B'
  },
  ListContainer: {}
}));
