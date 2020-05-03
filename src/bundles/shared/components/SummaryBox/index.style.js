import { makeStyles } from '@material-ui/core/styles';

const SHADOW_BACKDROP = '#282A3D';
export const SummaryBoxStyles = makeStyles(theme => ({
  GridContainer: {
    borderRadius: `${theme.spacing(0.7)}px`,
    justifyContent: 'center',
    alignItems: 'center',
    height: '130px',
    width: '90%',
    marginRight: `${theme.spacing(1.5)}px`,
    backgroundColor: '#3A3C4F',
    boxShadow: `5px 5px 10px 10px ${SHADOW_BACKDROP}`
  },
  ContainerItem: {
    fontWeight: '800'
  },
  Header: props => ({
    fontSize: `${theme.spacing(2)}px`,
    color: props.colors.header
  }),
  Caption: props => ({
    fontSize: `${theme.spacing(8)}px`,
    color: props.colors.caption
  })
}));
