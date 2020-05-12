import { makeStyles } from '@material-ui/styles'

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
