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
