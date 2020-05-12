import { makeStyles } from '@material-ui/styles';

export const StaffCreateStyles = makeStyles(_theme => ({
  PageContainer: {
    color: 'white'
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
    marginBottom: '4%'
  },
  FormGroupItem: {
    marginRight: '1.5%',
    color: 'white'
  },
  FormGroupLabel: {
    color: 'white',
    fontSize: '13px',
  },
  Form: {
    color: 'white'
  }
}));

const LIGHT_LILAC = '#464462';
const DEFAULT_GREY = '#8E8CA7';
export const InputStyles = makeStyles(theme => ({
  SelectInputIcon: {
    color: DEFAULT_GREY,
    position: 'relative',
    top: '10px'
  },
  TextInputContainer: {
    width: '100%',
    backgroundColor: LIGHT_LILAC,
    height: '35px',
    borderRadius: '8px',
    position: 'relative',
    bottom: '5px'
  },
  TabCaption: {
    color: DEFAULT_GREY,
    fontSize: `${theme.spacing(1.5)}px`,
    textAlign: 'center',
    position: 'relative',
    alignSelf: 'center',
    top: '3px'
  },
  InputView: {
    color: DEFAULT_GREY,
    fontWeight: '800',
    height: '35px',
    fontSize: '13px',
    textTransform: 'capitalize',
    paddingBottom: '20px',
    borderRadius: '3px'
  },
  SelectInput: {}
}));
