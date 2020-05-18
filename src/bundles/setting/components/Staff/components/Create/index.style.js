import { makeStyles } from '@material-ui/styles';

export const StaffCreateStyles = makeStyles(_theme => ({
  PageContainer: {
    color: '#231E1E',
    minHeight: '120vh'
  },
  FormContainer: {
    minHeight: '100vh',
    height: 'auto'
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
    height: '20px'
  },
  AvatarIcon: {
    width: _theme.spacing(12),
    height: _theme.spacing(12),
  },
  InfoContainer: {
    position: 'relative',
    top: '10px'
  },
  InfoContainerText: {
    fontSize: '12.5px',
    fontWeight: 'bold',
    marginBottom: '3%',
    color: '#685E5E'
  },
  UploadButton: {
    width: '100%',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#EFA14B',
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
    color: '#231E1E',
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
    color: '#231E1E'
  },
  AccessLevelForm: {
    minHeight: '100vh',
    height: 'auto'
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
    color: '#CACACA !important'
  },
  RadioChecked: {
    color: '#6EA915 !important'
  },
  ButtonContainer: {
    justifyContent: 'flex-end',
    // position: 'absolute',
    // bottom: 0
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
    backgroundColor: '#EFA14B',
    fontSize: '14px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#EFA14B',
      color: '#fff'
    }
  }
}));
