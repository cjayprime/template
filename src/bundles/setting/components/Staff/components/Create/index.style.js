import { makeStyles } from '@material-ui/styles';

export const StaffCreateStyles = makeStyles(_theme => ({
  PageContainer: {
    color: 'white',
    height: '120vh'
  },
  FormContainer: {
    height: '100vh'
  },
  FormContainerItem: {
    maxWidth: '100%',
    marginBottom: '2%'
  },
  HeaderSection: {},
  ProfileUploadText: {
    fontSize: '14px',
    marginBottom: '5%'
  },
  ProfileSectionContainer: {},
  Avatar: {
    height: '5vh'
  },
  AvatarIcon: {
    height: '10vh',
    width: '90%'
  },
  InfoContainer: {
    position: 'relative',
    top: '10px'
  },
  InfoContainerText: {
    fontSize: '12.5px',
    fontWeight: 'bold',
    marginBottom: '3%',
    color: 'rgb(189, 184, 217)'
  },
  UploadButton: {
    width: '100%',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#79BCC2',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  },
  FormGroupContainer: {
    marginBottom: '7%'
  },
  FormGroupItem: {
    marginRight: '1.5%',
    color: 'white'
  },
  FormGroupLabel: {
    color: 'white',
    fontSize: '13px'
  },
  Form: {
    color: 'white'
  },
  AccessLevelContainer: {},
  AccessHeaderSection: {},
  AccessHeadertext: {
    color: 'white',
    fontSize: '14px',
    marginBottom: '5%'
  },
  AccessLevelItemContainer: {},
  AccessLevelLabel: {},
  AccessLevelIconsContainer: {
    justifyContent: 'flex-start',
    paddingLeft: '20px',
    position: 'relative',
    bottom: '12px'
  },
  AccessLevelIcon: {
    marginRight: '2%',
    position: 'relative',
    bottom: '4px'
  },
  AccessLevelText: {
    fontSize: '12.5px',
    color: 'white'
  },
  AccessLevelForm: {
    height: '100vh'
  },
  LevelChildrenContainer: {
    position: 'relative',
    left: '5%',
    marginTop: '4%'
  },
  LevelItemContainer: {
    maxWidth: '100%'
  },
  LevelItem: {
    maxWidth: '100%',
    height: '60px'
  },
  Radio: {
    color: 'white !important'
  },
  RadioChecked: {
    color: '#79BCC2 !important'
  },
  ButtonContainer: {
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0
  },
  ButtonContainerItem: {
    textAlign: 'end',
    paddingTop: '.5%',
    paddingRight: '5%'
  },
  ButtonText: {
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'center',
    '&:hover': {
      color: '#E74C3C',
      cursor: 'pointer'
    }
  },
  Button: {
    height: '100%',
    width: '150px',
    color: 'white',
    backgroundColor: '#79BCC2',
    fontSize: '14px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: 'white',
      color: '#79BCC2'
    }
  }
}));
