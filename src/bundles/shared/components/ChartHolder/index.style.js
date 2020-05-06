import { makeStyles } from '@material-ui/styles';

export const ChartHolderStyles = makeStyles(theme => ({
  BaseContainer: {
    borderRadius: `${theme.spacing(0.7)}px`,
    justifyContent: 'center',
    alignItems: 'center',
    height: '130px',
    width: '90%',
    paddingTop: '5%',
    marginRight: `${theme.spacing(1.5)}px`,
    backgroundColor: '#3A3C4F',
    boxShadow: `5px 5px 10px 10px ${SHADOW_BACKDROP}`
  }
}));
